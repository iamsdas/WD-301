import { useState, useEffect, useRef } from 'react';
import { getLocalForms } from './Home';
import { saveLocalForms } from './Home';
import { Link } from 'raviger';
import FormInput from '../components/FormInput';
import NewFieldInput from '../components/NewFieldInput';

const saveFormData = (currState: IFormData) => {
  const localForms = getLocalForms();
  const updateLocalForms = localForms.map((form) =>
    form.id === currState.id ? currState : form
  );
  saveLocalForms(updateLocalForms);
};

const initState = (id: number) => {
  const forms = getLocalForms();
  return forms.find((form) => form.id === id)!;
};

const Form = ({ formId }: { formId: number }) => {
  const [state, setState] = useState(() => initState(formId));
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const addField = (field: IField) => {
    setState((state) => ({
      ...state,
      formFields: [
        ...state.formFields,
        {
          ...field,
          id: state.formFields.length + 1,
        },
      ],
    }));
  };

  const removeOption = (option: string, id: number) => {
    setState((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id && field.kind === 'multi_option'
          ? { ...field, options: field.options.filter((opt) => opt !== option) }
          : field
      ),
    }));
  };

  const removeField = (id: number) => {
    setState((state) => ({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    }));
  };

  const updateLabel = (id: number, newLabel: string) => {
    setState((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, label: newLabel } : field
      ),
    }));
  };

  return (
    <div className='divide-y-2 divide-dashed space-y-5'>
      <div>
        <input
          type='text'
          ref={ref}
          value={state.title}
          onChange={(e) => {
            setState((state) => ({ ...state, title: e.target.value }));
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2  focus:outline-none focus:border-blue-500'
        />
      </div>

      <div className='pt-4'>
        {state.formFields.length ? (
          state.formFields.map((field) => (
            <FormInput
              key={field.id}
              field={field}
              removeOptionCB={removeOption}
              removeFieldCB={removeField}
              updateLabelCB={updateLabel}
            />
          ))
        ) : (
          <div className='text-center py-4 capitalize'>no fields</div>
        )}
      </div>

      <NewFieldInput addFieldCB={addField} />

      <div className='pt-4 flex gap-2'>
        <Link
          className='border-gray-500 border-2 hover:border-gray-700 text-gray-500 hover:text-gray-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
          href='/'>
          Close Form
        </Link>
      </div>
    </div>
  );
};

export default Form;

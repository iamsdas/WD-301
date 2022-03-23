import { useState, FormEvent, useEffect, useRef } from 'react';
import LabeledInput from './LabeledInput';
import { getLocalForms } from './Home';
import { IFormData, saveLocalForms } from './Home';
import { Link } from 'raviger';

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
  const [newField, setNewField] = useState('');
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

  const addField = (e: FormEvent) => {
    e.preventDefault();
    setState((state) => ({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: state.formFields.length + 1,
          label: newField,
          type: 'text',
          value: '',
        },
      ],
    }));
    setNewField('');
  };

  const removeField = (id: number) => {
    setState((state) => ({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    }));
  };

  const updateField = (id: number, newVal: string) => {
    setState((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, value: newVal } : field
      ),
    }));
  };

  const clearForm = () => {
    setState((state) => ({
      ...state,
      formFields: state.formFields.map((field) => ({ ...field, value: '' })),
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
        {state.formFields.map((field) => (
          <LabeledInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            removeFieldCB={removeField}
            updateFieldCB={updateField}
          />
        ))}
      </div>
      <form className='flex gap-2 pt-4' onSubmit={addField}>
        <input
          type='text'
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2  focus:outline-none focus:border-blue-500'
        />
        <button
          className='bg-blue-500 inline-flex hover:bg-blue-700 text-white text-md font-bold py-1 px-2 rounded-lg items-center'
          type='submit'>
          Add Field
        </button>
      </form>
      <div className='pt-4 flex gap-2'>
        <button className='bg-blue-500 p-2 rounded-lg text-white font-bold'>
          Submit
        </button>
        <button
          className='bg-blue-500 p-2 rounded-lg text-white font-bold'
          onClick={clearForm}>
          Clear Form
        </button>
        <Link
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
          href='/'>
          Close Form
        </Link>
      </div>
    </div>
  );
};

export default Form;

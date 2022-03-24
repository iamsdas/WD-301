import { useState, useEffect } from 'react';
import { getLocalForms } from './Home';
import { saveLocalForms } from './Home';
import { Link } from 'raviger';
import PreviewInput from '../components/PreviewInput';

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

const Preview = ({ formId }: { formId: number }) => {
  const [state, setState] = useState(() => initState(formId));

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

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
      <div className='text-xl font-bold text-center'>{state.title}</div>
      <div className='pt-4'>
        {state.formFields.map((field) => (
          <PreviewInput
            key={field.id}
            field={field}
            updateFieldCB={updateField}
          />
        ))}
      </div>
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

export default Preview;

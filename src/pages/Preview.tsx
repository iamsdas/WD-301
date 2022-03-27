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
  const [question, setQuestion] = useState(0);
  const field = state.formFields[question];

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

  const nextQuestion = () => {
    if (question !== state.formFields.length - 1)
      setQuestion((question) => question + 1);
  };

  return (
    <div className='divide-y-2 divide-dashed space-y-5'>
      <div className='flex justify-between items-center'>
        <div className='text-xl font-bold'>{state.title}</div>
        <div className='flex gap-2'>
          <Link
            className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-lg'
            href='/'>
            Close
          </Link>
          <button
            className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-lg'
            onClick={clearForm}>
            Clear
          </button>
        </div>
      </div>
      <div className='pt-4'>
        {
          <PreviewInput
            key={field.id}
            field={field}
            updateFieldCB={updateField}
            nextQuestionCB={nextQuestion}
          />
        }
      </div>
      <div className='pt-4 flex gap-2 justify-between text-gray-700'>
        <button
          className='hover:text-blue-600 disabled:text-gray-400'
          disabled={question === 0}
          onClick={() => {
            setQuestion((question) => question - 1);
          }}>
          Previous Question
        </button>
        {question !== state.formFields.length - 1 ? (
          <button className='hover:text-blue-600' onClick={nextQuestion}>
            Next Question
          </button>
        ) : (
          <button className='bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded-lg text-white font-bold'>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Preview;

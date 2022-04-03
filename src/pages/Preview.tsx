import { useState, useEffect } from 'react';
import { getLocalForms } from './Home';
import { Link, navigate } from 'raviger';
import PreviewInput from '../components/PreviewInput';

const initState = (id: number) => {
  const forms = getLocalForms();
  let form = forms.find((form) => form.id === id);
  if (!form) form = { id, title: 'not found', formFields: [] };
  return form;
};

const Preview = ({ formId }: { formId: number }) => {
  const [state] = useState(() => initState(formId));
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState(state.formFields.map((_) => ''));
  const field = state.formFields[question];

  useEffect(() => {
    if (!getLocalForms().find((form) => form.id === formId)) navigate('/');
  });

  const updateField = (newVal: string) => {
    setAnswers((values) =>
      values.map((value, index) => (index === question ? newVal : value))
    );
  };

  const clearForm = () => {
    setAnswers((values) => values.map((_) => ''));
  };

  const nextQuestion = () => {
    if (question !== state.formFields.length - 1)
      setQuestion((question) => question + 1);
  };

  return (
    <div className='divide-y-2 divide-dashed space-y-5'>
      <div className='flex justify-between items-center'>
        <div className='text-2xl font-semibold'>{state.title}</div>
        <div className='flex gap-2'>
          <Link
            className='border-red-500 border-2 hover:border-red-700 text-red-500 hover:text-red-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
            href='/'>
            Close
          </Link>
          <button
            className='border-gray-500 border-2 hover:border-gray-700 text-gray-500 hover:text-gray-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
            onClick={clearForm}>
            Clear
          </button>
        </div>
      </div>
      <div className='pt-4'>
        {state.formFields.length ? (
          <PreviewInput
            key={field.id}
            field={field}
            value={answers[question]}
            updateFieldCB={updateField}
            nextQuestionCB={nextQuestion}
          />
        ) : (
          <div className='text-center py-4 capitalize'>No Questions</div>
        )}
      </div>
      <div className='pt-4 flex gap-2 justify-between text-gray-700'>
        <button
          className='hover:text-blue-600 disabled:text-gray-400'
          disabled={!question || !state.formFields.length}
          onClick={() => {
            setQuestion((question) => question - 1);
          }}>
          Previous Question
        </button>
        {question !== state.formFields.length - 1 ? (
          <button
            className='hover:text-blue-600 disabled:text-gray-400'
            onClick={nextQuestion}
            disabled={state.formFields.length === 0}>
            Next Question
          </button>
        ) : (
          <button className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 text-md py-1 px-2 rounded-lg items-center font-semibold'>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Preview;

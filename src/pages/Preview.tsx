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
    setAnswers((values) => {
      const newVals = [...values];
      newVals[question] = newVal;
      return newVals;
    });
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
        {question < answers.length ? (
          <PreviewInput
            key={field.id}
            field={field}
            value={answers[question]}
            updateFieldCB={updateField}
            nextQuestionCB={nextQuestion}
          />
        ) : (
          <div>No Questions</div>
        )}
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

import { useEffect, useReducer } from 'react';
import { getLocalForms } from './Home';
import { Link, navigate } from 'raviger';
import PreviewInput from '../components/PreviewInput';

interface IState {
  question: number;
  answers: string[];
  form: IFormData;
}

type QuestionActionType = {
  type: 'next_question' | 'prev_question';
};

type ClearFormActionType = {
  type: 'clear';
};

type UpdateFieldActionType = {
  type: 'update';
  val: string;
};

type ActionType =
  | QuestionActionType
  | ClearFormActionType
  | UpdateFieldActionType;

const reducer = (state: IState, action: ActionType): IState => {
  switch (action.type) {
    case 'prev_question':
      return {
        ...state,
        question: state.question !== 0 ? state.question - 1 : state.question,
      };
    case 'next_question':
      return {
        ...state,
        question:
          state.question !== state.form.formFields.length - 1
            ? state.question + 1
            : state.question,
      };
    case 'clear':
      return { ...state, answers: state.answers.map((_) => '') };
    case 'update':
      return {
        ...state,
        answers: state.answers.map((value, index) =>
          index === state.question ? action.val : value
        ),
      };

    default:
      return state;
  }
};

const initState = (id: number): IState => {
  const forms = getLocalForms();
  let form = forms.find((form) => form.id === id);
  if (!form) form = { id, title: 'not found', formFields: [] };
  return { form, question: 0, answers: form.formFields.map((_) => '') };
};

const Preview = ({ formId }: { formId: number }) => {
  const [state, dispatch] = useReducer(reducer, null, () => initState(formId));
  const field = state.form.formFields[state.question];

  useEffect(() => {
    if (!getLocalForms().find((form) => form.id === formId)) navigate('/');
  });

  const clearForm = () => {
    dispatch({ type: 'clear' });
  };

  return (
    <div className='divide-y-2 divide-dashed space-y-5'>
      <div className='flex justify-between items-center'>
        <div className='text-2xl font-semibold'>{state.form.title}</div>
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
        {state.form.formFields.length ? (
          <PreviewInput
            key={field.id}
            field={field}
            value={state.answers[state.question]}
            nextQuestionCB={() => dispatch({ type: 'next_question' })}
          />
        ) : (
          <div className='text-center py-4 capitalize'>No Questions</div>
        )}
      </div>
      <div className='pt-4 flex gap-2 justify-between text-gray-700'>
        <button
          className='hover:text-blue-600 disabled:text-gray-400'
          disabled={!state.question || !state.form.formFields.length}
          onClick={() => {
            dispatch({ type: 'prev_question' });
          }}>
          Previous Question
        </button>
        {state.question !== state.form.formFields.length - 1 ? (
          <button
            className='hover:text-blue-600 disabled:text-gray-400'
            onClick={() => dispatch({ type: 'next_question' })}
            disabled={state.form.formFields.length === 0}>
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

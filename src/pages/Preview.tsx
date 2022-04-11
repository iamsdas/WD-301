import { useState, useEffect, useCallback } from 'react';
import { Link } from 'raviger';
import PreviewInput from '../components/PreviewInput';
import { getFields, getForm, submitForm } from '../utils';

const defaultItem: IFormItem = {
  id: -1,
  title: '',
  description: '',
  is_public: false,
};

type ansType = {
  form_field: number;
  value: string;
};

const Preview = ({ formId }: { formId: number }) => {
  const [formItem, setFormItem] = useState<IFormItem>(defaultItem);
  const [fields, setFields] = useState<IField[]>([]);
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<ansType[]>([]);
  const [loading, setLoading] = useState(true);

  const initState = useCallback(async () => {
    setLoading(true);
    const formItemData: IFormItem = await getForm(formId);
    const formFieldsData: IPaginated<IField> = await getFields(formId);
    setFormItem(formItemData);
    setFields(formFieldsData.results);
    setLoading(false);
  }, [formId]);

  const field = fields[question];

  useEffect(() => {
    initState();
  }, [initState]);

  const updateField = (newVal: string, fieldId: number) => {
    if (answers.find((ans) => ans.form_field === fieldId))
      setAnswers((answers) =>
        answers.map((field_ans) =>
          field_ans.form_field === fieldId
            ? { ...field_ans, value: newVal }
            : field_ans
        )
      );
    else setAnswers((ans) => [...ans, { form_field: fieldId, value: newVal }]);
  };

  const clearForm = useCallback(() => {
    setAnswers([]);
  }, []);

  const nextQuestion = () => {
    if (question !== fields.length - 1) setQuestion((question) => question + 1);
  };

  return loading ? (
    <div className='flex w-full justify-center items-center py-6'>
      <svg
        role='status'
        className='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-300'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor'></path>
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'></path>
      </svg>
    </div>
  ) : (
    <div className='divide-y-2 divide-dashed space-y-5'>
      <div className='flex justify-between items-center'>
        <div className='text-2xl font-semibold'>{formItem.title}</div>
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
        {fields.length ? (
          <PreviewInput
            key={field.id}
            field={field}
            value={
              answers.find((ans) => ans.form_field === field.id)?.value ??
              field.value
            }
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
          disabled={!question || !fields.length}
          onClick={() => {
            setQuestion((question) => question - 1);
          }}>
          Previous Question
        </button>
        {question !== fields.length - 1 ? (
          <button
            className='hover:text-blue-600 disabled:text-gray-400'
            onClick={nextQuestion}
            disabled={fields.length === 0}>
            Next Question
          </button>
        ) : (
          <button
            onClick={() => {
              submitForm(formId, answers);
            }}
            className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 text-md py-1 px-2 rounded-lg items-center font-semibold'>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Preview;

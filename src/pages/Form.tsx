import { Link } from 'raviger';
import { useState, useRef, useEffect, useCallback } from 'react';
import FormInput from '../components/FormInput';
import NewFieldInput from '../components/NewFieldInput';
import { getForm, getFields, updateForm, notify } from '../utils';
import ShareForm from '../components/ShareForm';

const defaultItem: IFormItem = {
  id: -1,
  title: '',
  description: '',
  is_public: false,
};

const Form = ({ formId }: { formId: number }) => {
  const [formItem, setFormItem] = useState<IFormItem>(defaultItem);
  const [fields, setFields] = useState<IField[]>([]);
  const [titleName, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  const initState = useCallback(async () => {
    setLoading(true);
    try {
      const formItemData: IFormItem = await getForm(formId);
      const formFieldsData: IPaginated<IField> = await getFields(formId);
      setFormItem(formItemData);
      setTitle(formItemData.title);
      setFields(formFieldsData.results);
    } catch (e) {
      notify('danger', 'Error fetching form');
    }
    setLoading(false);
  }, [formId]);

  const removeField = useCallback(
    (fieldId: number) => {
      setFields(fields.filter((field) => field.id !== fieldId));
    },
    [fields]
  );

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (formItem.title !== titleName) {
        const updatedForm: IFormItem = { ...formItem, title: titleName };
        updateForm(formId, updatedForm).catch((e) =>
          notify('danger', 'Error updating form')
        );
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [formId, formItem, initState, titleName]);

  useEffect(() => {
    initState();
  }, [initState]);

  return loading ? (
    <div className='flex w-full justify-center items-center py-6'>
      <svg
        aria-hidden='true'
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
        <input
          type='text'
          ref={ref}
          value={titleName}
          aria-label='Title Name'
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />
        <ShareForm />
      </div>

      <ul className='pt-4'>
        {fields.length ? (
          fields.map((field) => (
            <FormInput
              formId={formId}
              key={field.id}
              field={field}
              removeFieldCB={removeField}
            />
          ))
        ) : (
          <div className='text-center py-4 capitalize'>no fields</div>
        )}
      </ul>

      <NewFieldInput formId={formItem.id!} refreshFormCB={initState} />

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

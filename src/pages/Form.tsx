import { Link } from 'raviger';
import { useState, useRef, useEffect, useCallback } from 'react';
import FormInput from '../components/FormInput';
import NewFieldInput from '../components/NewFieldInput';
import { getForm, getFields, updateForm } from '../utils';

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
  const ref = useRef(null);

  const initState = useCallback(async () => {
    const formItemData: IFormItem = await getForm(formId);
    const formFieldsData: IPaginated<IField> = await getFields(formId);
    setFormItem(formItemData);
    setTitle(formItemData.title);
    setFields(formFieldsData.results);
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
        updateForm(formId, updatedForm);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [formId, formItem, initState, titleName]);

  useEffect(() => {
    initState();
  }, [initState]);

  return (
    <div className='divide-y-2 divide-dashed space-y-5'>
      <div>
        <input
          type='text'
          ref={ref}
          value={titleName}
          onChange={(e) => setTitle(e.target.value)}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2  focus:outline-none focus:border-blue-500'
        />
      </div>

      <div className='pt-4'>
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
      </div>

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

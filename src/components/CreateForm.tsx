import { navigate } from 'raviger';
import { useState, ChangeEvent, FormEvent } from 'react';
import { createForm } from '../utils';

const validateForm = (form: IFormItem) => {
  const errors: IError<IFormItem> = {};
  if (form.title.length < 1) errors.title = 'Title is required';
  if (form.title.length > 100)
    errors.title = 'Title must be less than 100 chars';
  return errors;
};

const CreateForm = () => {
  const [form, setForm] = useState<IFormItem>({
    title: '',
    description: '',
    is_public: false,
  });

  const [errors, setErrors] = useState<IError<IFormItem>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createForm(form);
        navigate(`/forms/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='space-y-1 w-full'>
          <label htmlFor='title' className='text-lg block'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={form.title}
            onChange={handleChange}
            className='w-full border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
          />
        </div>
        {errors.title && <p className='text-red-500'>{errors.title}</p>}
        <div className='space-y-1'>
          <label htmlFor='description' className='text-lg block'>
            Description
          </label>
          <input
            type='text'
            name='description'
            id='description'
            value={form.description}
            onChange={handleChange}
            className='w-full border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
          />
        </div>
        {errors.description && (
          <p className='text-red-500'>{errors.description}</p>
        )}
        <div className='space-x-2 py-2'>
          <input
            type='checkbox'
            name='is_public'
            id='is_public'
            value={form.is_public ? 'true' : 'false'}
            onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
            className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
          />
          <label htmlFor='is_public' className='text-lg'>
            is_public
          </label>
        </div>
        {errors.is_public && <p className='text-red-500'>{errors.is_public}</p>}
        <button
          type='submit'
          className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 text-lg py-1 px-2 rounded-lg items-center font-semibold'>
          submit
        </button>
      </form>
    </div>
  );
};

export default CreateForm;

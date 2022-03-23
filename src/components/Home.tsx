import { Link, useQueryParams } from 'raviger';
import { useEffect, useState } from 'react';

const formFields: IFormField[] = [
  { label: 'First Name', id: 1, type: 'text', value: '' },
  { label: 'Last Name', id: 2, type: 'text', value: '' },
  { label: 'Email', id: 3, type: 'email', value: '' },
  { label: 'Phone Number', id: 4, type: 'number', value: '' },
  { label: 'Date of Birth', id: 5, type: 'date', value: '' },
];
export interface IFormField {
  id: number;
  label: string;
  type: string;
  value: string;
}

export interface IFormData {
  id: number;
  title: string;
  formFields: IFormField[];
}

export const saveLocalForms = (localForms: IFormData[]) => {
  localStorage.setItem('forms', JSON.stringify(localForms));
};

export const getLocalForms = (): IFormData[] => {
  const savedForms = localStorage.getItem('forms');
  if (savedForms) return JSON.parse(savedForms);
  const newForms = [{ title: 'Untitled', formFields, id: Number(new Date()) }];
  saveLocalForms(newForms);
  return newForms;
};

const addNewForm = () => {
  const localForms = getLocalForms();
  saveLocalForms([
    ...localForms,
    { title: 'Untitled', formFields, id: Number(new Date()) },
  ]);
};

const removeForm = (id: number) => {
  const localForms = getLocalForms();
  saveLocalForms(localForms.filter((form) => form.id !== id));
};

const FormList = () => {
  const [forms, setForms] = useState(() => getLocalForms());
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const newForms = getLocalForms();
      if (forms.length !== newForms.length) setForms(newForms);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [forms]);

  return (
    <div>
      <form
        className='flex gap-2 pb-4'
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}>
        <input
          type='text'
          placeholder='Search Form'
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2  focus:outline-none focus:border-blue-500'
        />
      </form>
      <div className='divide-y-2 border-y-2 mb-2'>
        {forms
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || '')
          )
          .map((form) => (
            <div
              className='flex justify-between items-center py-2'
              key={form.id}>
              <div className='text-lg'>{form.title}</div>
              <div className='flex gap-2'>
                <Link
                  href={`/form/${form.id}`}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg'>
                  open
                </Link>
                <button
                  onClick={() => removeForm(form.id)}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg'>
                  remove
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className='capitalize flex gap-2'>
        <button
          onClick={addNewForm}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>
          New Form
        </button>
      </div>
    </div>
  );
};

export default FormList;

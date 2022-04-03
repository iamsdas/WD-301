import { Link, useQueryParams } from 'raviger';
import { useEffect, useState } from 'react';

const formFields: IField[] = [
  { kind: 'single_option', label: 'First Name', id: 1, type: 'text' },
  { kind: 'single_option', label: 'Last Name', id: 2, type: 'text' },
  { kind: 'single_option', label: 'Email', id: 3, type: 'email' },
  { kind: 'single_option', label: 'Phone Number', id: 4, type: 'number' },
  { kind: 'single_option', label: 'Date of Birth', id: 5, type: 'date' },
];

export const saveLocalForms = (localForms: IFormData[]) => {
  localStorage.setItem('forms', JSON.stringify(localForms));
};

export const getLocalForms = (): IFormData[] => {
  const savedForms = localStorage.getItem('forms');
  if (savedForms) return JSON.parse(savedForms);
  const newForms: IFormData[] = [
    { title: 'Untitled', formFields, id: Number(new Date()) },
  ];
  saveLocalForms(newForms);
  return newForms;
};

const FormList = () => {
  const [forms, setForms] = useState(() => getLocalForms());
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState('');

  const addNewForm = () => {
    setForms((forms) => [
      ...forms,
      { title: 'Untitled', formFields, id: Number(new Date()) },
    ]);
  };

  const removeForm = (id: number) => {
    setForms((forms) => forms.filter((form) => form.id !== id));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveLocalForms(forms);
    }, 300);
    return () => {
      clearTimeout(timeout);
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
              <Link href={`/preview/${form.id}`}>
                <div className='flex flex-col'>
                  <div className='text-lg hover:text-blue-600'>
                    {form.title}
                  </div>
                  <div className='text-gray-500 text-sm'>{`${form.formFields.length} quizes`}</div>
                </div>
              </Link>
              <div className='flex gap-2'>
                <Link
                  href={`/form/${form.id}`}
                  className='border-gray-500 border-2 hover:border-gray-700 text-gray-500 hover:text-gray-700 text-md py-1 px-2 rounded-lg items-center font-semibold'>
                  Edit
                </Link>
                <button
                  onClick={() => removeForm(form.id)}
                  className='border-red-500 border-2 hover:border-red-700 text-red-500 hover:text-red-700 text-md py-1 px-2 rounded-lg items-center font-semibold'>
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className='capitalize flex gap-2 pt-1'>
        <button
          onClick={addNewForm}
          className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 text-md py-1 px-2 rounded-lg items-center font-semibold'>
          New Form
        </button>
      </div>
    </div>
  );
};

export default FormList;

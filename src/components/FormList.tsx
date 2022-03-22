import { useEffect, useState } from 'react';
import { IFormData, IFormField, saveLocalForms } from './FormContainer';

const formFields: IFormField[] = [
  { label: 'First Name', id: 1, type: 'text', value: '' },
  { label: 'Last Name', id: 2, type: 'text', value: '' },
  { label: 'Email', id: 3, type: 'email', value: '' },
  { label: 'Phone Number', id: 4, type: 'number', value: '' },
  { label: 'Date of Birth', id: 5, type: 'date', value: '' },
];

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

const FormList = ({
  closeFormCB,
  showFormCB,
}: {
  closeFormCB: () => void;
  showFormCB: (id: number) => void;
}) => {
  const [forms, setForms] = useState(() => getLocalForms());

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
      <div className='divide-y-2 border-y-2 mb-2'>
        {forms.map((form) => (
          <div className='flex justify-between items-center py-2' key={form.id}>
            <div className='text-lg'>{form.title}</div>
            <div className='flex gap-2'>
              <button
                onClick={() => showFormCB(form.id)}
                className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg'>
                open
              </button>
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
          new form
        </button>
        <button
          onClick={closeFormCB}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>
          close
        </button>
      </div>
    </div>
  );
};

export default FormList;

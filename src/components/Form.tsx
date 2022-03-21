import { useState, FormEvent } from 'react';
import LabeledInput from './LabeledInput';

const formFields = [
  { label: 'First Name', id: 1, type: 'text', value: '' },
  { label: 'Last Name', id: 2, type: 'text', value: '' },
  { label: 'Email', id: 3, type: 'email', value: '' },
  { label: 'Phone Number', id: 4, type: 'number', value: '' },
  { label: 'Date of Birth', id: 5, type: 'date', value: '' },
];

const Form = ({ closeFormCB }: { closeFormCB: () => void }) => {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState('');

  const addField = (e: FormEvent) => {
    e.preventDefault();
    setState((state) => [
      ...state,
      { id: state.length + 1, label: newField, type: 'text', value: '' },
    ]);
    setNewField('');
  };

  const removeField = (id: number) => {
    setState((state) => state.filter((field) => field.id !== id));
  };

  const updateField = (id: number, newVal: string) => {
    setState((state) =>
      state.map((field) =>
        field.id === id ? { ...field, value: newVal } : field
      )
    );
  };

  const clearForm = () => {
    setState((state) => state.map((field) => ({ ...field, value: '' })));
  };

  console.count('render');

  return (
    <div className='divide-y-2 divide-dashed space-y-5'>
      <div>
        {state.map((field) => (
          <LabeledInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            removeFieldCB={removeField}
            updateFieldCB={updateField}
          />
        ))}
      </div>
      <form className='flex gap-2 pt-4' onSubmit={addField}>
        <input
          type='text'
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2  focus:outline-none focus:border-blue-500'
        />
        <button
          className='bg-blue-500 inline-flex hover:bg-blue-700 text-white text-md font-bold py-1 px-2 rounded-lg items-center'
          type='submit'>
          Add Field
        </button>
      </form>
      <div className='pt-4 flex gap-2'>
        <button className='bg-blue-500 p-2 rounded-lg text-white font-bold'>
          Submit
        </button>
        <button
          className='bg-blue-500 p-2 rounded-lg text-white font-bold'
          onClick={clearForm}>
          Clear Form
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
          onClick={closeFormCB}>
          Close Form
        </button>
      </div>
    </div>
  );
};

export default Form;

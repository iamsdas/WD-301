import { FC } from 'react';

interface IFormField {
  field: IField;
  removeFieldCB: (id: number) => void;
  updateLabelCB: (id: number, newLabel: string) => void;
}

const FormInput: FC<IFormField> = ({ field, removeFieldCB, updateLabelCB }) => {
  return (
    <div className='flex gap-2 my-1 items-stretch'>
      <input
        type='text'
        value={field.label}
        onChange={(e) => {
          updateLabelCB(field.id, e.target.value);
        }}
        className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
      />
      <button
        className='bg-red-500 hover:bg-red-700 text-white text-md font-bold py-1 px-2 rounded-lg'
        onClick={() => removeFieldCB(field.id)}>
        Remove
      </button>
    </div>
  );
};

export default FormInput;

import { FC } from 'react';

interface IField {
  id: number;
  label: string;
  type: string;
  value: string;
  removeField: (id: number) => void;
  updateField: (id: number, newVal: string) => void;
}

const LabeledInput: FC<IField> = (props) => {
  return (
    <>
      <label className='capitalize'>{props.label}</label>
      <div className='flex gap-2 my-1 items-stretch'>
        <input
          type={props.type}
          value={props.value}
          onChange={(e) => {
            props.updateField(props.id, e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-1 px-2 rounded-lg'
          onClick={() => props.removeField(props.id)}>
          Remove
        </button>
      </div>
    </>
  );
};

export default LabeledInput;

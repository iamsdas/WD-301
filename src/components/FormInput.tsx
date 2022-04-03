import { FC } from 'react';

interface IFormField {
  field: IField;
  removeFieldCB: (id: number) => void;
  updateLabelCB: (id: number, newLabel: string) => void;
  removeOptionCB: (option: string, id: number) => void;
}

const FormInput: FC<IFormField> = ({
  field,
  removeFieldCB,
  updateLabelCB,
  removeOptionCB,
}) => {
  return (
    <div className='my-1'>
      <span className='mx-1 font-light'>{field.type}</span>
      <div className='flex gap-2 items-stretch'>
        <input
          type='text'
          value={field.label}
          onChange={(e) => {
            updateLabelCB(field.id, e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />
        <button
          className='border-red-500 border-2 hover:border-red-700 text-red-500 hover:text-red-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
          onClick={() => removeFieldCB(field.id)}>
          Remove
        </button>
      </div>
      <>
        {field.kind === 'multi_option' && (
          <div className='flex gap-2 flex-wrap my-1'>
            {field.options.map((option, index) => (
              <div
                key={option + index}
                className='bg-gray-200 rounded-2xl p-2 flex'>
                <div>{option}</div>
                <button
                  className='text-gray-500 hover:text-gray-700 pl-1'
                  onClick={() => removeOptionCB(option, field.id)}>
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default FormInput;

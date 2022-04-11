import { FC, useState, useEffect } from 'react';
import { removeField, updateField } from '../utils';

interface IFormField {
  field: IField;
  formId: number;
  removeFieldCB: (id: number) => void;
}

const FormInput: FC<IFormField> = ({ formId, field, removeFieldCB }) => {
  const [fieldLabel, setLabel] = useState(field.label);
  const [options, setOptions] = useState(field.options);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const updatedField: IField = { ...field, label: fieldLabel, options };
      updateField(formId, field.id, updatedField);
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [fieldLabel, field, formId, options]);

  return (
    <li className='my-1'>
      <span className='mx-1 font-light lowercase'>{field.kind}</span>
      <div className='flex gap-2 items-stretch'>
        <input
          type='text'
          aria-label='Field Label'
          value={fieldLabel}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />
        <button
          className='border-red-500 border-2 hover:border-red-700 text-red-500 hover:text-red-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
          onClick={() => {
            removeField(formId, field.id);
            removeFieldCB(field.id);
          }}>
          Remove
        </button>
      </div>
      <>
        {(field.kind === 'DROPDOWN' || field.kind === 'RADIO') && (
          <div className='flex gap-2 flex-wrap my-1'>
            {options.map((option, index) => (
              <div
                key={option + index}
                className='bg-gray-200 rounded-2xl p-2 flex'>
                <div>{option}</div>
                <button
                  className='text-gray-500 hover:text-gray-700 pl-1'
                  onClick={() => {
                    setOptions((options) =>
                      options.filter((opt) => opt !== option)
                    );
                  }}>
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </>
    </li>
  );
};

export default FormInput;

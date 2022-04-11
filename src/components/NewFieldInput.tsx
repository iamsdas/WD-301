import { FormEvent, useState } from 'react';
import { addField } from '../utils';

const NewFieldInput = ({
  formId,
  refreshFormCB,
}: {
  formId: number;
  refreshFormCB: () => Promise<void>;
}) => {
  const [newField, setNewField] = useState('');
  const [newOption, setNewOption] = useState('');
  const [type, setType] = useState<FieldType>('TEXT');
  const [options, setOptions] = useState<string[]>([]);

  const typeChangehandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as FieldType);
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const field: Partial<IField> = {
      kind: type,
      label: newField,
      options,
      value: '',
    };

    await addField(formId, field);
    refreshFormCB();
    setNewField('');
    setOptions([]);
  };

  return (
    <div className='w-full space-y-2 pt-4'>
      <form className='flex justify-between gap-2' onSubmit={formSubmitHandler}>
        <input
          type='text'
          aria-label='New Field Label'
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />

        <select
          name='type'
          aria-label='Field Type'
          value={type}
          onChange={typeChangehandler}
          className='text-ellipsis rounded-lg text-center p-1 bg-white border-2'>
          <option value='TEXT'>text</option>
          <option value='DROPDOWN'>dropdown</option>
          <option value='RADIO'>radio</option>
        </select>

        <button
          className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
          type='submit'>
          Add Field
        </button>
      </form>

      {(type === 'DROPDOWN' || type === 'RADIO') && (
        <div>
          <ul className='flex gap-2 flex-wrap'>
            {options.map((option, index) => (
              <li
                key={option + index}
                className='bg-gray-200 rounded-2xl p-2 flex'>
                <div>{option}</div>
                <button
                  onClick={() => {
                    setOptions((options) =>
                      options.filter((curr) => curr !== option)
                    );
                  }}
                  className='text-gray-500 hover:text-gray-700 pl-1'>
                  x
                </button>
              </li>
            ))}
          </ul>
          <form
            className='flex justify-start items-center gap-2 pt-2'
            onSubmit={(e) => {
              e.preventDefault();
              if (!options.includes(newOption))
                setOptions((options) => [...options, newOption]);
              setNewOption('');
            }}>
            <input
              type='text'
              aria-label='New Option'
              value={newOption}
              onChange={(e) => {
                setNewOption(e.target.value);
              }}
              className='border-2 border-gray-200 rounded-lg p-1 focus:outline-none focus:border-blue-500'
            />
            <button
              className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 py-1 px-2 rounded-lg items-center font-semibold'
              type='submit'>
              Add Option
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default NewFieldInput;

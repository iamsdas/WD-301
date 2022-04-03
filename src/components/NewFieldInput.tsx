import { FormEvent, useState } from 'react';

const NewFieldInput = ({
  addFieldCB,
}: {
  addFieldCB: (field: IField) => void;
}) => {
  const [newField, setNewField] = useState('');
  const [newOption, setNewOption] = useState('');
  const [type, setType] = useState('text');
  const [options, setOptions] = useState<string[]>([]);
  const [multiOption, setMultiOption] = useState(false);

  const typeChangehandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMultiOption(
      ['dropdown', 'radio', 'multiselect'].includes(e.target.value)
    );
    setType(e.target.value);
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const field: IField = multiOption
      ? {
          id: 0,
          kind: 'multi_option',
          label: newField,
          type: type as MultiOptionFieldType,
          options,
        }
      : {
          id: 0,
          kind: 'single_option',
          label: newField,
          type: type as SignOptionFieldType,
        };
    addFieldCB(field);
    setNewField('');
    setOptions([]);
  };

  return (
    <div className='w-full space-y-2 pt-4'>
      <form className='flex justify-between gap-2' onSubmit={formSubmitHandler}>
        <input
          type='text'
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />

        <select
          name='type'
          value={type}
          onChange={typeChangehandler}
          className='text-ellipsis rounded-lg text-center p-1 bg-white border-2'>
          <option value='text'>text</option>
          <option value='dropdown'>dropdown</option>
          <option value='multiselect'>multiselect</option>
          <option value='radio'>radio</option>
          <option value='textarea'>textarea</option>
        </select>

        <button
          className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
          type='submit'>
          Add Field
        </button>
      </form>

      {multiOption && (
        <div>
          <div className='flex gap-2 flex-wrap'>
            {options.map((option, index) => (
              <div
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
              </div>
            ))}
          </div>
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

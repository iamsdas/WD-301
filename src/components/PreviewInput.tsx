import { FC, useRef, useEffect, useCallback, useState } from 'react';

interface IPreviewField {
  field: IField;
  value: string;
  updateFieldCB: (newVal: string) => void;
  nextQuestionCB: () => void;
}

const PreviewInput: FC<IPreviewField> = ({
  field,
  value,
  updateFieldCB,
  nextQuestionCB,
}) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [field]);
  const [expanded, setExpanded] = useState(false);
  const [multiVals, setMultiVals] = useState<string[]>(() =>
    field.type === 'multiselect' && value ? JSON.parse(value) : []
  );

  useEffect(() => {
    if (field.type === 'multiselect') {
      const timeout = setTimeout(() => {
        updateFieldCB(JSON.stringify(multiVals));
      }, 100);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [multiVals, updateFieldCB, field.type]);

  const inputOfType = useCallback(() => {
    switch (field.type) {
      case 'dropdown':
        return (
          <select
            className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
            ref={ref}
            value={value}
            onChange={(e) => updateFieldCB(e.target.value)}>
            {field.options.map((option, index) => (
              <option value={option} key={option + index}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
            ref={ref}
            value={value}
            onChange={(e) => updateFieldCB(e.target.value)}></textarea>
        );
      case 'radio':
        return (
          <div className='flex justify-between w-full flex-wrap mt-1'>
            {field.options.map((option, index) => (
              <div key={option + index} className='space-x-2'>
                <input
                  type='radio'
                  name='radio-group'
                  checked={option === value}
                  value={option}
                  onChange={(e) => updateFieldCB(e.target.value)}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        );
      case 'multiselect':
        return (
          <div className='w-full'>
            <button
              className='p-2 bg-gray-200 rounded-xl text-lg w-full flex justify-between items-center'
              onClick={() => setExpanded((expanded) => !expanded)}
              type='button'>
              <span>
                {multiVals.length ? (
                  multiVals.map((val) => <span>{val} </span>)
                ) : (
                  <span>option</span>
                )}
              </span>
              <span className='text-sm'>
                <svg
                  className='-mr-1 ml-2 h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'>
                  <path
                    fill-rule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  />
                </svg>
              </span>
            </button>
            <div
              className={`bg-gray-100 w-full flex-col justify-center items-start pl-4 text-lg rounded-t-md rounded-b-xl ${
                expanded ? 'flex' : 'hidden'
              }`}>
              {field.options.map((option, index) => (
                <div key={option + index} className='space-x-2'>
                  <input
                    type='checkbox'
                    checked={multiVals.includes(option)}
                    onChange={(e) => {
                      if (!multiVals.includes(option) && e.target.checked) {
                        setMultiVals((multiVals) => [...multiVals, option]);
                      } else if (!e.target.checked) {
                        setMultiVals((multiVals) =>
                          [...multiVals].filter((val) => val !== option)
                        );
                      }
                    }}
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            value={value}
            ref={ref}
            onChange={(e) => {
              updateFieldCB(e.target.value);
            }}
            className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
          />
        );
    }
  }, [field, updateFieldCB, value, multiVals, expanded]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        nextQuestionCB();
      }}>
      <label className='capitalize'>{field.label}</label>
      <div className='flex gap-2 my-1 items-stretch'>{inputOfType()}</div>
    </form>
  );
};

export default PreviewInput;

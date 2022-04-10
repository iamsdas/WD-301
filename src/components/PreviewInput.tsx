import { FC, useRef, useEffect, useCallback } from 'react';

interface IPreviewField {
  field: IField;
  value: string;
  nextQuestionCB: () => void;
}

const PreviewInput: FC<IPreviewField> = ({ field, value, nextQuestionCB }) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [field]);

  useEffect(() => {
    if (field.kind === 'DROPDOWN') {
      const timeout = setTimeout(() => {
        // updateFieldCB(JSON.stringify(multiVals));
      }, 100);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [field.kind]);

  const inputOfType = useCallback(() => {
    switch (field.kind) {
      case 'DROPDOWN':
        return (
          <select
            className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
            ref={ref}
            value={value}
            // onChange={(e) => updateFieldCB(e.target.value)}
          >
            {field.options.map((option, index) => (
              <option value={option} key={option + index}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'RADIO':
        return (
          <div className='flex justify-between w-full flex-wrap mt-1'>
            {field.options.map((option, index) => (
              <div key={option + index} className='space-x-2'>
                <input
                  type='radio'
                  name='radio-group'
                  checked={option === value}
                  value={option}
                  // onChange={(e) => updateFieldCB(e.target.value)}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <input
            type='text'
            value={value}
            ref={ref}
            onChange={(e) => {
              // updateFieldCB(e.target.value);
            }}
            className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
          />
        );
    }
  }, [field, value]);

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

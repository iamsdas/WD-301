import { FC, useRef, useEffect } from 'react';

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
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [field]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        nextQuestionCB();
      }}>
      <label className='capitalize'>{field.label}</label>
      <div className='flex gap-2 my-1 items-stretch'>
        <input
          type={field.type}
          value={value}
          ref={ref}
          onChange={(e) => {
            updateFieldCB(e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />
      </div>
    </form>
  );
};

export default PreviewInput;

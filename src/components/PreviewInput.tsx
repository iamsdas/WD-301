import { FC } from 'react';

interface IPreviewField {
  field: IField;
  updateFieldCB: (id: number, newVal: string) => void;
}

const PreviewInput: FC<IPreviewField> = ({ field, updateFieldCB }) => {
  return (
    <>
      <label className='capitalize'>{field.label}</label>
      <div className='flex gap-2 my-1 items-stretch'>
        <input
          type={field.type}
          value={field.value}
          onChange={(e) => {
            updateFieldCB(field.id, e.target.value);
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />
      </div>
    </>
  );
};

export default PreviewInput;

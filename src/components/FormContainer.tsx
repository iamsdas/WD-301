import { useState, useCallback } from 'react';
import Form from './Form';
import FormList from './FormList';

export interface IFormField {
  id: number;
  label: string;
  type: string;
  value: string;
}

export interface IFormData {
  id: number;
  title: string;
  formFields: IFormField[];
}

export const saveLocalForms = (localForms: IFormData[]) => {
  localStorage.setItem('forms', JSON.stringify(localForms));
};

const FormContainer = ({ closeFormCB }: { closeFormCB: () => void }) => {
  const [displayList, setDisplayList] = useState(true);
  const [formId, setFormId] = useState(0);

  const showForm = useCallback((id: number) => {
    setFormId(id);
    setDisplayList(false);
  }, []);

  const showList = useCallback(() => {
    setDisplayList(true);
  }, []);

  return (
    <>
      {displayList ? (
        <FormList closeFormCB={closeFormCB} showFormCB={showForm} />
      ) : (
        <Form closeFormCB={showList} formId={formId} />
      )}
    </>
  );
};

export default FormContainer;

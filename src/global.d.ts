type SignOptionFieldType = 'text' | 'email' | 'number' | 'date' | 'textarea';
type MultiOptionFieldType = 'dropdown' | 'multiselect' | 'radio';

interface ISingleOptionptionField {
  kind: 'single_option';
  id: number;
  label: string;
  type: SignOptionFieldType;
}

interface IMultiOptionField {
  kind: 'multi_option';
  id: number;
  label: string;
  options: string[];
  type: MultiOptionFieldType;
}

type IField = ISingleOptionptionField | IMultiOptionField;

interface IFormData {
  id: number;
  title: string;
  formFields: IField[];
}

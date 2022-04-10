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

type FieldType = 'TEXT' | 'DROPDOWN' | 'RADIO' | 'GENERIC';

interface IField {
  id: number;
  label: string;
  kind: FieldType;
  options: string[];
  value: string;
}

interface IFieldItem {}

// type IField = ISingleOptionptionField | IMultiOptionField;

interface IFormData {
  id: number;
  title: string;
  formFields: IField[];
}

interface IFormItem {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
}

type IError<T> = Partial<Record<keyof T, string>>;

type User = any;

interface IPaginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface IPaginaitonParams {
  offset: number;
  limit: number;
}

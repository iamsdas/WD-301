interface IField {
  id: number;
  label: string;
  type: 'text' | 'email' | 'number' | 'date';
  value: string;
}

interface IFormData {
  id: number;
  title: string;
  formFields: IFormField[];
}

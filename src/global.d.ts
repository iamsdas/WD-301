interface IField {
  id: number;
  label: string;
  type: 'text' | 'email' | 'number' | 'date';
}

interface IFormData {
  id: number;
  title: string;
  formFields: IField[];
}

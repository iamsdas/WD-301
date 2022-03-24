interface IField {
  id: number;
  label: string;
  type: string;
  value: string;
}

interface IFormData {
  id: number;
  title: string;
  formFields: IFormField[];
}

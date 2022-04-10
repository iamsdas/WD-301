const API_BASE_URL = 'https://tsapi.coronasafe.live/api';

const request = async (
  endpoint: string,
  method: string = 'GET',
  data: any = null
) => {
  let payload: string;
  let url: string;
  const token = localStorage.getItem('token');
  const auth = token ? 'Token ' + localStorage.getItem('token') : '';

  if (method === 'GET') {
    const reqParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join('&')}`
      : '';
    payload = '';
    url = `${API_BASE_URL}/${endpoint}/${reqParams}`;
  } else {
    payload = data ? JSON.stringify(data) : '';
    url = `${API_BASE_URL}/${endpoint}/`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: method !== 'GET' ? payload : null,
  });

  const json = await response.json();
  if (response.ok) return await json;
  else throw Error(json);
};

export const createForm = (form: IFormItem) => {
  return request('forms', 'POST', form);
};

export const login = (username: string, password: string) => {
  return request('auth-token', 'POST', { username, password });
};

export const me = () => {
  return request('users/me', 'GET');
};

export const listForms = (pageParams: IPaginaitonParams) => {
  return request('forms', 'GET', pageParams);
};

export const getFields = (formId: number) => {
  return request(`forms/${formId}/fields`);
};

export const getForm = (formId: number) => {
  return request(`forms/${formId}`);
};

export const addField = (formId: number, field: Partial<IField>) => {
  return request(`forms/${formId}/fields`, 'POST', field);
};

export const removeField = (formId: number, fieldId: number) => {
  return request(`forms/${formId}/fields/${fieldId}`, 'DELETE');
};

export const updateField = (formId: number, fieldId: number, field: IField) => {
  return request(`forms/${formId}/fields/${fieldId}`, 'PATCH', field);
};

export const updateForm = (formId: number, form: IFormItem) => {
  return request(`forms/${formId}`, 'PATCH', form);
};

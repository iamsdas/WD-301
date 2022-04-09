import { useEffect, useRef, useReducer } from 'react';
import { getLocalForms } from './Home';
import { saveLocalForms } from './Home';
import { Link } from 'raviger';
import FormInput from '../components/FormInput';
import NewFieldInput from '../components/NewFieldInput';

const saveFormData = (currState: IFormData) => {
  const localForms = getLocalForms();
  const updateLocalForms = localForms.map((form) =>
    form.id === currState.id ? currState : form
  );
  saveLocalForms(updateLocalForms);
};

const initState = (id: number) => {
  const forms = getLocalForms();
  return forms.find((form) => form.id === id)!;
};

enum ActionTypes {
  ADD_FIELD,
  REMOVE_FIELD,
  REMOVE_OPTION,
  UPDATE_LABEL,
  UPDATE_TITLE,
}

type RemoveFieldActionType = {
  type: ActionTypes.REMOVE_FIELD;
  id: number;
};

type RemoveOptionActionType = {
  type: ActionTypes.REMOVE_OPTION;
  id: number;
  option: string;
};

type AddFieldActionType = {
  type: ActionTypes.ADD_FIELD;
  field: IField;
};

type UpdateLabelActionType = {
  type: ActionTypes.UPDATE_LABEL;
  id: number;
  newLabel: string;
};

type UpdateTitleActionType = {
  type: ActionTypes.UPDATE_TITLE;
  title: string;
};

type FormAction =
  | RemoveFieldActionType
  | RemoveOptionActionType
  | AddFieldActionType
  | UpdateLabelActionType
  | UpdateTitleActionType;

const reducer = (state: IFormData, action: FormAction): IFormData => {
  switch (action.type) {
    case ActionTypes.ADD_FIELD:
      return {
        ...state,
        formFields: [
          ...state.formFields,
          {
            ...action.field,
            id: state.formFields.length + 1,
          },
        ],
      };
    case ActionTypes.REMOVE_FIELD:
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };
    case ActionTypes.UPDATE_LABEL:
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.id ? { ...field, label: action.newLabel } : field
        ),
      };
    case ActionTypes.REMOVE_OPTION:
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.id && field.kind === 'multi_option'
            ? {
                ...field,
                options: field.options.filter((opt) => opt !== action.option),
              }
            : field
        ),
      };
    case ActionTypes.UPDATE_TITLE:
      return { ...state, title: action.title };
    default:
      return state;
  }
};

const Form = ({ formId }: { formId: number }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, null, () => initState(formId));

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className='divide-y-2 divide-dashed space-y-5'>
      <div>
        <input
          type='text'
          ref={ref}
          value={state.title}
          onChange={(e) => {
            dispatch({ type: ActionTypes.UPDATE_TITLE, title: e.target.value });
          }}
          className='flex-1 border-2 border-gray-200 rounded-lg p-2  focus:outline-none focus:border-blue-500'
        />
      </div>

      <div className='pt-4'>
        {state.formFields.length ? (
          state.formFields.map((field) => (
            <FormInput
              key={field.id}
              field={field}
              removeOptionCB={(option, id) =>
                dispatch({ type: ActionTypes.REMOVE_OPTION, id, option })
              }
              removeFieldCB={(id) =>
                dispatch({ type: ActionTypes.REMOVE_FIELD, id })
              }
              updateLabelCB={(id, newLabel) =>
                dispatch({ type: ActionTypes.UPDATE_LABEL, id, newLabel })
              }
            />
          ))
        ) : (
          <div className='text-center py-4 capitalize'>no fields</div>
        )}
      </div>

      <NewFieldInput
        addFieldCB={(field) => dispatch({ type: ActionTypes.ADD_FIELD, field })}
      />

      <div className='pt-4 flex gap-2'>
        <Link
          className='border-gray-500 border-2 hover:border-gray-700 text-gray-500 hover:text-gray-700 text-md py-1 px-2 rounded-lg items-center font-semibold'
          href='/'>
          Close Form
        </Link>
      </div>
    </div>
  );
};

export default Form;

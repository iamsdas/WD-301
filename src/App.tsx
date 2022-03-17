import Header from './Header';
import AppContainer from './AppContainer';
import { Fragment } from 'react';

const formFields = [
  { label: 'First Name', id: 1, type: 'text' },
  { label: 'Last Name', id: 2, type: 'text' },
  { label: 'Email', id: 4, type: 'email' },
  { label: 'Phone Number', id: 5, type: 'number' },
  { label: 'Date of Birth', id: 6, type: 'date' },
];

function App() {
  return (
    <AppContainer>
      <div className='p-4 mx-auto bg-white shadow-lg rounded-xl font-semibold text-lg'>
        <Header title='Welcome to Lesson 5 of $react-typescript with #tailwindcss' />
        <form className='px-2'>
          {formFields.map((field) => (
            <Fragment key={field.id}>
              <label className='capitalize'>{field.label}</label>
              <input
                type={field.type}
                className='border-2 border-gray-200 rounded-lg p-2 my-3 w-full focus:outline-none focus:border-blue-500'
              />
            </Fragment>
          ))}
          <button
            type='submit'
            className='bg-blue-500 p-2 rounded-lg text-white font-bold mt-2 text-xl'>
            Submit
          </button>
        </form>
      </div>
    </AppContainer>
  );
}

export default App;

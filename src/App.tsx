import Header from './components/Header';
import AppContainer from './components/AppContainer';
import { useCallback, useState } from 'react';
import Home from './components/Home';
import Form from './components/Form';

function App() {
  const [state, setState] = useState('HOME');

  const closeFormCB = useCallback(() => {
    setState('HOME');
  }, []);

  const openFormCB = useCallback(() => {
    setState('FORM');
  }, []);

  return (
    <AppContainer>
      <div className='p-5 my-8 mx-auto bg-white shadow-lg rounded-xl'>
        <Header title='Welcome to Lesson 5 of $react-typescript with #tailwindcss' />
        {state === 'HOME' ? (
          <Home openFormCB={openFormCB}></Home>
        ) : (
          <Form closeFormCB={closeFormCB}></Form>
        )}
      </div>
    </AppContainer>
  );
}

export default App;

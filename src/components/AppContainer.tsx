import Header from './Header';

const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-screen bg-gray-100 justify-center px-8 overflow-auto'>
      <div className='p-5 my-8 mx-auto bg-white shadow-lg rounded-xl w-1/3'>
        <Header title='Welcome to Lesson 5 of $react-typescript with #tailwindcss' />
        {props.children}
      </div>
    </div>
  );
};
export default AppContainer;

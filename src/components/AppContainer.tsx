import Header from './Header';

const AppContainer = (props: {
  currentUser: User;
  children: React.ReactNode;
}) => {
  return (
    <div className='flex flex-col h-screen bg-gray-100 justify-start p-8 overflow-y-scroll'>
      <div className='p-5 mx-auto my-auto bg-white shadow-lg rounded-xl w-2/5'>
        <Header currentUser={props.currentUser} />
        {props.children}
      </div>
    </div>
  );
};
export default AppContainer;

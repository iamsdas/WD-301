const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-screen bg-gray-100 justify-center px-8 overflow-auto'>
      {props.children}
    </div>
  );
};
export default AppContainer;

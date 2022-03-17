const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen bg-gray-100 items-center px-8'>
      {props.children}
    </div>
  );
};
export default AppContainer;

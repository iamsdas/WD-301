import logo from './logo.svg';

const Header = (props: { title: string }) => {
  return (
    <div className='flex gap-2 items-center'>
      <img src={logo} className='animate-spin h-16' alt='logo' />
      <h1 className='text-center text-2xl flex-1'>{props.title}</h1>
    </div>
  );
};

export default Header;

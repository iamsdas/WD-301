import logo from '../logo.svg';

const Home = ({ openFormCB }: { openFormCB: () => void }) => {
  return (
    <div className='flex flex-col justify-center items-stretch text-xl'>
      <div className='flex'>
        <img src={logo} alt='' className='h-48 block' />
        <div className='flex flex-1 items-center justify-center'>
          <p>welcome to the home page</p>
        </div>
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded-lg'
        onClick={openFormCB}>
        Open Form
      </button>
    </div>
  );
};

export default Home;

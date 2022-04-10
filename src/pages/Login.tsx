import { navigate } from 'raviger';
import { FormEvent, useEffect } from 'react';
import { login } from '../utils';

const Login = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputJson: any = Object.fromEntries(formData);
    try {
      const data = await login(inputJson.username, inputJson.password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      localStorage.removeItem('token');
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, []);

  return (
    <form onSubmit={handleSubmit} className='space-y-3 w-full md:px-4'>
      <div>
        <p>Username</p>
        <input
          type='text'
          name='username'
          className='w-full border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />
      </div>
      <div>
        <p>Password</p>
        <input
          type='password'
          name='password'
          className='w-full border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500'
        />
      </div>
      <button
        type='submit'
        className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 text-lg py-1 px-2 rounded-lg items-center font-semibold'>
        Login
      </button>
    </form>
  );
};

export default Login;

import { ActiveLink } from 'raviger';
import { useContext } from 'react';
import logo from '../logo.svg';
import { userContext } from '../utils';

const Header = () => {
  const currentUser = useContext(userContext);
  return (
    <div className='flex gap-2 items-center font-semibold pb-4'>
      <img src={logo} className='animate-spin h-16' alt='logo' />
      <div className='flex gap-2 items-center justify-around uppercase my-1'>
        {[
          { page: 'home', url: '/' },
          { page: 'about', url: '/about' },
          currentUser?.username.length > 0
            ? {
                page: 'logout',
                onclick: () => {
                  localStorage.removeItem('token');
                  window.location.reload();
                },
              }
            : { page: 'login', url: '/login' },
        ].map((link) =>
          link.url ? (
            <ActiveLink
              href={link.url}
              exactActiveClass='text-blue-600'
              className='px-1'
              key={link.url}>
              {link.page}
            </ActiveLink>
          ) : (
            <button
              key={link.page}
              className='px-1 uppercase font-semibold'
              onClick={link.onclick}>
              {link.page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Header;

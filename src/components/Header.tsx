import { ActiveLink } from 'raviger';
import logo from '../logo.svg';

const Header = (props: { title: string }) => {
  return (
    <div className='flex gap-2 items-center font-semibold pb-4'>
      <img src={logo} className='animate-spin h-16' alt='logo' />
      <div className='flex gap-2 items-center justify-around uppercase my-1'>
        {[
          { page: 'home', url: '/' },
          { page: 'about', url: '/about' },
        ].map((link) => (
          <ActiveLink
            href={link.url}
            exactActiveClass='text-blue-600'
            className='px-1'
            key={link.url}>
            {link.page}
          </ActiveLink>
        ))}
      </div>
    </div>
  );
};

export default Header;

import Link from 'next/link';
import SupportButton from '@/components/support-button';
import { Button } from 'antd';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__inner'>
        <Link href="/" className='header__logo'>
          Ä
        </Link>
        <div className='header__menu'>
          <Button type='text'>
            Articles
          </Button>
          <Button type='text'>
            Media
          </Button>
          <Button type='text'>
            About
          </Button>
        </div>
        <SupportButton />
      </div>
    </header>
  );
};

export default Header;

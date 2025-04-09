import Link from 'next/link';
import SupportButton from '@/components/support-button';
import { Button } from 'antd';

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo">
          Ä
        </Link>
        <div className="header__menu">
          <Link href="/articles">
            <Button type="text">Articles</Button>
          </Link>
          <Link href="/media">
            <Button type="text">Media</Button>
          </Link>
          <Link href="/about">
            <Button type="text">About</Button>
          </Link>
        </div>
        <SupportButton />
      </div>
    </header>
  );
};

export default Header;

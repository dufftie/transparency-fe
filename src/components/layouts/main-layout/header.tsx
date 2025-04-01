'use client';

import { Button } from 'antd';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <Link href="/">
        <img src="/logo.svg" alt="Läbipaistvus logotype" className="logo" />
      </Link>
      <Button type='primary' size='large'>Donate</Button>
    </header>
  );
};

export default Header;

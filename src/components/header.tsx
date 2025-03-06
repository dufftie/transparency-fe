import { Button } from 'antd';

const Header = () => {
  return (
    <header>
      <img src='/logo.svg' alt='Läbipaistvus logotype' className='logo' />
      <div className='control-island'>
        <Button>About</Button>
        <Button>Lang</Button>
      </div>
      <Button>Donate</Button>
    </header>
  );
}

export default Header;
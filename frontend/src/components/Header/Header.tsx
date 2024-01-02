import { Auth } from '../Auth';
import { Logo } from '../Logo';
import { NavBar } from '../NavBar';
import './header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />

        <NavBar />

        <Auth />
      </div>
    </header>
  );
};

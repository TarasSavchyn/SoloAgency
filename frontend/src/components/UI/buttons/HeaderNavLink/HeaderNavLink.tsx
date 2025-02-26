import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { HeaderNavLink as NavLinkType } from '../../../../types/HeaderNavLink';
import './header-nav-link.scss';

type Props = {
  link: NavLinkType;
  menu: {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  };
};

export const HeaderNavLink: React.FC<Props> = ({
  link: { path, text, state },
  menu: { isMenuOpen, toggleMenu },
}) => {
  const handleMenuClosure = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return state ? (
    <Link
      to={path}
      className="header-nav-link"
      onClick={handleMenuClosure}
      state={state}
    >
      {text}
    </Link>
  ) : (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames('header-nav-link', { 'header-nav-link--active': isActive })
      }
      onClick={handleMenuClosure}
    >
      {text}
    </NavLink>
  );
};

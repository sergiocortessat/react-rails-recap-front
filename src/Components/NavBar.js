import { Link } from 'react-router-dom';
import AuthenticationButton from '../auth0/Auth0';

const pages = [
  { name: 'Home', path: '/' },
];

const NavBar = () => (
  <nav>
    <div className="nav-links">
      {pages.map((page) => (
        <Link key={page.name} to={page.path}>
          {page.name}
        </Link>
      ))}
    </div>
    <AuthenticationButton />
  </nav>
);

export default NavBar;
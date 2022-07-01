import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  return (
    <nav>
      <Link to={'/'}>
        <h3>Blog App</h3>
      </Link>

      <ul>
        <li>
          <Link to={'/about'}>About</Link>
        </li>
        <li>
          {cookies.token ? (
            <button
              className="logout-button"
              onClick={(e) => {
                e.preventDefault();
                removeCookie('token');
                navigate('/');
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to={'/login'}>Login</Link>
          )}
        </li>
        {cookies.token ? (
          <li>
            <Link to={'/posts'}>Posts</Link>
          </li>
        ) : null}
        {cookies.token ? (
          <li>
            <Link to={'/create'}>Create</Link>
          </li>
        ) : null}
        {cookies.token ? (
          <li>
            <Link to={'/profile'}>Profile</Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;

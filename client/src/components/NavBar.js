import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
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
              onClick={(e) => {
                e.preventDefault();
                removeCookie('token');
                window.location.reload();
                navigate('/');
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

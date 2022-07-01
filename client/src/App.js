import './App.css';
import { Link } from 'react-router-dom';
import Jumbotron from './components/Jumbotron';
import { useCookies } from 'react-cookie';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies] = useCookies(['token']);

  return (
    <div className="App">
      <Jumbotron text={'Welcome to the Demo Blog App'} />
      <div className="content-section">
        {cookies.token ? (
          <h2>Enjoy the Demo Experience!</h2>
        ) : (
          <>
            <h2>Join the trial period for this application today!</h2>
            <h3>Click the link below!</h3>
            <Link to={'/register'}>
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

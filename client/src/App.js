import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to={'/register'}>Register</Link>
    </>
  );
};

export default App;

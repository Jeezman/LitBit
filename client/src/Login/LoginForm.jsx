import { useState } from 'react';
import { Loader } from '../components/Loader';
import './LoginForm.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  let auth = useAuth();

  let navigate = useNavigate();
  let location = useLocation();

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    let from = location.state?.from?.pathname || '/';

    auth.signin(
      () => {
        if (from.length < 3) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
        setIsLoading(false);
      },
      () => {
        setError('Username or Password incorrect');
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="form">
      <div className="form-toggle"></div>
      <div className="form-panel one">
        <div className="form-header">
          <h1>Admin Login</h1>
        </div>
        <div className="form-content">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required="required"
                onChange={(e) => auth.setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required="required"
                onChange={(e) => auth.setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <p className="form-remember font-semibold text-red-500">
                {error}
              </p>
            </div>
            <div className="form-group">
              <button>{isLoading ? <Loader /> : <span>Log In</span>}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { Loader } from '../components/Loader';
import './LoginForm.scss';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
  };
  return (
    <div class="form">
      <div class="form-toggle"></div>
      <div class="form-panel one">
        <div class="form-header">
          <h1>Admin Login</h1>
        </div>
        <div class="form-content">
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required="required"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required="required"
              />
            </div>
            <div class="form-group">
              <label class="form-remember">
                <input type="checkbox" />
                Remember Me
              </label>
              <a class="form-recovery" href="#">
                Forgot Password?
              </a>
            </div>
            <div class="form-group">
              <button onClick={handleLogin}>
                {isLoading ? <Loader /> : <span>Log In</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div class="form-panel two">
        <div class="form-header">
          <h1>Register Account</h1>
        </div>
        <div class="form-content">
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required="required"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required="required"
              />
            </div>
            <div class="form-group">
              <label for="cpassword">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                required="required"
              />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required="required" />
            </div>
            <div class="form-group">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
};

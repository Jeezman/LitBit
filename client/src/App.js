
import './App.css';
import { Route, Routes } from "react-router-dom";
import styled from 'styled-components'
import { LoginForm } from './Login/LoginForm';
import { Dashboard } from './Dashboard';
import { Payroll } from './Dashboard/Payroll';
import { DashboardHome } from './Dashboard/Settings';
import { Node } from './Dashboard/Node';
import { AuthProvider, RequireAuth, useAuth, AuthContext } from './Auth';
import { LitBitLogo } from './assets/icons';



function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }>
            <Route path="" element={<DashboardHome />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="node/:id" element={<Node />} />
          </Route>
        </Routes>

      </div>
    </AuthProvider >
  );
}

export default App;


const Login = ({ }) => {
  return <LoginContainer>
    <LitBitLogo size={130} width={130} />
    <LoginForm />
  </LoginContainer>
}

const LoginContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import styled from 'styled-components'
import { LoginForm } from './Login/LoginForm';
import { Loader } from './components/Loader';
import { Dashboard } from './Dashboard';
import { Payroll } from './Dashboard/Payroll';
import { DashboardHome } from './Dashboard/Settings';
import { Node } from './Dashboard/Node';





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="node/:id" element={<Node />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;


const Login = ({ }) => {
  return <LoginContainer>
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
`
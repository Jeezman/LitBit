import { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from './components/Sidebar';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <DashboardContainer>
      <Sidebar setSidebarOpen={sidebarOpen} sidebarOpen={setSidebarOpen} />
      <div className="border-solid border-2 border-indigo-600 h-screen">
        <Outlet />
      </div>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
`;

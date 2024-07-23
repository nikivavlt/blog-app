import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import User from '../User/User';

const Dashboard = (): JSX.Element => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get('tab');
    if (selectedTab !== null) {
      setTab(selectedTab);
    }
  }, [location.search]);

  return (
  // section tag
    <div>Dashboard (or List of users, protected route and access required from backend)
      <div>
        Sidebar
      </div>
      <div>
        Profile
        { tab === 'profile' && < User/> }
      </div>

    </div>
  );
};

export default Dashboard;

import React from 'react';
import styled from 'styled-components';

import AccountButton from '../../components/Nav/AccountButton';
interface PageHeaderProps {
  icon: React.ReactNode;
  subtitle?: string;
  title?: string;
}

const Header: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <div className="page-header">
        <nav className="navbar navbar-expand-lg d-flex justify-content-between">
          <div className="header-title flex-fill">
            <a href="#" id="sidebar-toggle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </a>
            {children}
          </div>
          <div className="flex-fill" id="headerNav">
            <ul className="navbar-nav">
              <li className="nav-item d-md-block d-lg-none">
                <a className="nav-link" href="#" id="toggle-search"><i data-feather="search"></i></a>
              </li>
              <li className="nav-item">
                <AccountButton text="Connect" />
              </li>
            </ul>
          </div>
        </nav>
      </div>
  );
};

export default Header;

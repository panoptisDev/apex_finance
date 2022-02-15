import React, { useEffect } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';

import Footer from '../Footer';
import Nav from '../Nav';
import styled from 'styled-components';


import fantomLogo from '../../assets/img/apex-finance-logo.png';
import fantom_logo_grey from '../../assets/img/fantom-logo-grey.png';
const Page: React.FC = ({ children }) => {
  const router = useLocation();
  const pathname = router.pathname;
  useEagerConnect();
  useEffect(() => {
    // Update the document title using the browser API
    
  });
  return (
  /*  <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Nav />
      <Container maxWidth="lg" style={{ paddingBottom: '5rem' }}>
        {children}
      </Container>
      <Footer />
    </div>*/
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="page-sidebar">
        <a className="logo">
          <img src = {fantomLogo} className="mt-2" width="150" alt="" />
        </a>
        <ul className="list-unstyled accordion-menu">
          <li className={pathname == "/" ? "active-page" : ""}>
            <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Dashboard
            </Link>
          </li>
          <li className={pathname == "/cemetery" ? "active-page" : ""}>
            <Link to="/cemetery">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sunrise"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline></svg>
            Farming
            </Link>
          </li>
          <li className={pathname == "/masonry" ? "active-page" : ""}>
            <Link to="/masonry">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-codesandbox"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Board Room
          </Link>
          </li>
          <li className={pathname == "/pit" ? "active-page" : ""}>
            <Link to="/pit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Buy & Redeem</Link>
          </li>
          <li><a href="dao.html"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Docs</a>
          </li>
          <li className="text-muted mt-5" style= {{ paddingLeft : "18px", fontSize : "13px"}}>Powered by<br/>
            <img src={fantom_logo_grey} className="mt-2" width="80" alt="" />
          </li>
        </ul>
      </div>
      <div className="page-content">
        <div className = "animateme">
          <ul className = "bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Page;

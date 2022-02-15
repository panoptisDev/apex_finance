import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';
import AccountButton from '../../components/Nav/AccountButton';

import MetamaskFox from '../../assets/img/metamask-fox.svg';
import img_ftm from "../../assets/img/crypto/ftm.png";
import img_apex from "../../assets/img/crypto/apex.png";
import img_ashares from "../../assets/img/crypto/ashares.png";
import img_abonds from "../../assets/img/crypto/abonds.png";

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

import Header from "../../components/Header";
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('TOMB-FTM-LP');
  const tShareFtmLpStats = useLpStats('TSHARE-FTM-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'TOMB-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'TSHARE-FTM-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
  `;

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'TOMB-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'TSHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      <Header>
        <h5>Welcome to Apex Finance <span class="fs-6 text-muted">The ecosystem of growth</span></h5>
      </Header>
      {/* <BackgroundImage /> */}
      <div className="main-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <div className="card card-bg actions-widget text-center">
              <div className="card-body">
                <div className="actions-widget-item">
                  <Link to="/cemetery">
                    <button type="button" className="btn btn-circle text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sunrise"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline></svg>
                    </button>
                  </Link>
                  <span className="actions-widget-item-title">Farm</span>
                </div>
                <div className="actions-widget-item">
                  <Link to = "/masonry">
                    <button type="button" className="btn btn-circle text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-codesandbox"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </button>
                  </Link>
                  <span className="actions-widget-item-title">Stake</span>
                </div>
                <div className="actions-widget-item">
                  <a target="_blank" href = {buyTombAddress}>
                    <button type="button" className="btn btn-circle text-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-ccw"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                    </button>
                  </a> 
                  <span className="actions-widget-item-title">Buy APX</span>
                </div>
                <div className="actions-widget-item">
                  <a target="_blank" href = {buyTShareAddress}>
                    <button type="button" className="btn btn-circle text-info">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-ccw"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                    </button>
                  </a>
                  <span className="actions-widget-item-title">Buy ASHARES</span>
                </div>
                <div className="actions-widget-item">
                  <button type="button" className="btn btn-circle text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </button>
                  <span className="actions-widget-item-title">Claim Bonds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-bg">
              <div className="card-body">
                <h5 className="card-title">Apex Ecosystem Assets</h5>
                <table className="table crypto-table">
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Market cap</th>
                    <th scope="col">Circulating supply</th>
                    <th scope="col">Trade</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td><img src={img_apex} alt="" />Tomb</td>
                    <td>{tombPriceInFTM ? tombPriceInFTM : '-.----'} FTM <span style={{marginLeft : "15px"}} className="text-muted"> ${tombPriceInDollars ? tombPriceInDollars : '-.--'}</span></td>
                    <td>${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)}</td>
                    <td>{tombCirculatingSupply}</td>
                    <td>
                      <button type="button" className="btn btn-outline-success m-b-xs" 
                      onClick={() => {
                        tombFinance.watchAssetInMetamask('TOMB');
                      }}>
                      +&nbsp;
                      <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                      </button>
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td><img src={img_abonds} alt="" />TBOND</td>
                    <td>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} FTM <span style={{marginLeft : "15px"}} className="text-muted"> ${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span></td>
                    <td>${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)}</td>
                    <td>{tBondCirculatingSupply}</td>
                    <td>
                      <button type="button" className="btn btn-outline-success m-b-xs"
                      onClick={() => {
                        tombFinance.watchAssetInMetamask('TBOND');
                      }}>
                      +&nbsp;
                      <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td><img src={img_ashares} alt="" />TSHARE</td>
                    <td>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} FTM <span style={{marginLeft : "15px"}} className="text-muted"> ${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span></td>
                    <td>${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)}</td>
                    <td>{tShareCirculatingSupply}</td>
                    <td>
                      <button type="button" className="btn btn-outline-success m-b-xs"
                       onClick={() => {
                        tombFinance.watchAssetInMetamask('TSHARE');
                      }}>
                        +&nbsp;
                      <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                      </button>
                      </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;

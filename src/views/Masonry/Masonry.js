import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useRedeemOnMasonry from '../../hooks/useRedeemOnMasonry';
import useStakedBalanceOnMasonry from '../../hooks/useStakedBalanceOnMasonry';
import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../hooks/useFetchMasonryAPR';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnMasonry from '../../hooks/useTotalStakedOnMasonry';
import useClaimRewardCheck from '../../hooks/masonry/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/masonry/useWithdrawCheck';
import ProgressCountdown from './components/ProgressCountdown';
import MasonryImage from '../../assets/img/masonry.png';

import Header from "../../components/Header";
import { createGlobalStyle } from 'styled-components';

const BackgroundImage = createGlobalStyle`
  body, html {
    background: url(${MasonryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Masonry = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const { onRedeem } = useRedeemOnMasonry();
  const stakedBalance = useStakedBalanceOnMasonry();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnMasonry();
  const masonryAPR = useFetchMasonryAPR();
  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();

  return (
    <Page>
      <Header>
        <h5>Board Room <span className="fs-6 text-muted">Earn premiums in $APX upon staking $ASHARE</span></h5>
      </Header>
      {!!account ? (
        <>
          <Box mt={5}>
            <div className="row row-cols-5">
              <div className="col m-b-sm">
                <ul className="list-group st-pricing-table card-bg">
                  <li className="list-group-item">
                    <h3 className="st-pricing-table-header fs-6">Next Epoch</h3>
                    <hr />
                    <p>
                      <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col m-b-sm">
                <ul className="list-group st-pricing-table card-bg">
                  <li className="list-group-item">
                    <h3 className="st-pricing-table-header fs-6">Current Epoch</h3>
                    <hr />
                    <p>{Number(currentEpoch)}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col m-b-sm">
                <ul className="list-group st-pricing-table card-bg">
                  <li className="list-group-item">
                    <h3 className="st-pricing-table-header fs-6">APEX Price (TWAP)</h3>
                    <hr />
                    <p>{scalingFactor}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col m-b-sm">
                <ul className="list-group st-pricing-table card-bg">
                  <li className="list-group-item">
                    <h3 className="st-pricing-table-header fs-6">APR</h3>
                    <hr />
                    <p>{masonryAPR.toFixed(2)}%
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col m-b-sm">
                <ul className="list-group st-pricing-table card-bg">
                  <li className="list-group-item">
                    <h3 className="st-pricing-table-header fs-6">ASHARES Staked</h3>
                    <hr />
                    <p>{getDisplayBalance(totalStaked)}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper>
                  <Spacer />
                  <StyledCardWrapper>
                    <Stake />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box> */}
            <div className="row">
              <Harvest />
              <Stake />
            </div>
            <div className="row">
              <div className="col">
                  <div className="row">
                      <div className="col-md-12 m-b-sm">
                          <p className="text-muted" style={{fontZize: "14px"}}>Staked ASHARES can <b>only</b> be withdrawn after 6 epochs since deposit.</p>
                      </div>
                  </div>
              </div>
          </div>
          </Box>

          {/* <Box mt={5}>
            <Grid container justify="center" spacing={3} mt={10}>
              <Button
                disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
                color="primary"
                variant="contained"
              >
                Claim and Withdraw
              </Button>
            </Grid>
          </Box> */}
        </>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Masonry;

import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/masonry/useWithdrawCheck';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useTombFinance from '../../../hooks/useTombFinance';
import ProgressCountdown from './../components/ProgressCountdown';
import useStakedBalanceOnMasonry from '../../../hooks/useStakedBalanceOnMasonry';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerMasonry from '../../../hooks/masonry/useUnstakeTimerMasonry';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToMasonry from '../../../hooks/useStakeToMasonry';
import useWithdrawFromMasonry from '../../../hooks/useWithdrawFromMasonry';

const Stake: React.FC = () => {
  const tombFinance = useTombFinance();
  const [approveStatus, approve] = useApprove(tombFinance.TSHARE, tombFinance.contracts.Masonry.address);

  const tokenBalance = useTokenBalance(tombFinance.TSHARE);
  const stakedBalance = useStakedBalanceOnMasonry();
  const { from, to } = useUnstakeTimerMasonry();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('TSHARE', tombFinance.TSHARE);
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  // const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToMasonry();
  const { onWithdraw } = useWithdrawFromMasonry();
  const canWithdrawFromMasonry = useWithdrawCheck();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'TShare'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'TShare'}
    />,
  );

  return (
    <div className="col-md-6 m-b-sm">
      <ul className="list-group st-pricing-table card-bg">
        <li className="list-group-item">
          <h3 className="st-pricing-table-header">ASHARE Staked</h3>
        </li>
        <li className="list-group-item">
          <table className="table" style={{marginBottom: "0px !important"}}>
            <thead className="st-pricing-table-header">
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Price USD</th>
                <th scope="col">Approve</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{getDisplayBalance(stakedBalance)}</td>
                <td>{`≈ $${tokenPriceInDollars}`}</td>
                <td>
                {approveStatus !== ApprovalState.APPROVED ? (
  
                  <button type="button" 
                  disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                  onClick={approve}
                  className="btn btn-outline-success m-b-xs"
                  >
                    Approve
                  </button>
                ) : (
                  <>
                    <IconButton disabled={!canWithdrawFromMasonry} onClick={onPresentWithdraw}>
                      <RemoveIcon />
                    </IconButton>
                    <StyledActionSpacer />
                    <IconButton onClick={onPresentDeposit}>
                      <AddIcon />
                    </IconButton>
                  </>
                )}
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <Box mt={2} style={{ color: '#FFF' }}>
        {canWithdrawFromMasonry ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{ textAlign: 'center' }}>Withdraw possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Withdraw available in" />
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
      
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;

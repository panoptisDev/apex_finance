import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';

import TokenSymbol from '../../../components/TokenSymbol';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import CardIcon from '../../../components/CardIcon';
import useClaimRewardTimerMasonry from '../../../hooks/masonry/useClaimRewardTimerMasonry';
import useClaimRewardCheck from '../../../hooks/masonry/useClaimRewardCheck';
import ProgressCountdown from './../components/ProgressCountdown';
import useHarvestFromMasonry from '../../../hooks/useHarvestFromMasonry';
import useEarningsOnMasonry from '../../../hooks/useEarningsOnMasonry';
import useTombStats from '../../../hooks/useTombStats';
import { getDisplayBalance } from '../../../utils/formatBalance';

const Harvest: React.FC = () => {
  const tombStats = useTombStats();
  const { onReward } = useHarvestFromMasonry();
  const earnings = useEarningsOnMasonry();
  const canClaimReward = useClaimRewardCheck();

  const tokenPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const { from, to } = useClaimRewardTimerMasonry();

  return (
    <div className="col-md-6 m-b-sm">
      <ul className="list-group st-pricing-table card-bg">
        <li className="list-group-item">
          <h3 className="st-pricing-table-header">APX Earned</h3>
        </li>
        <li className="list-group-item">
          <table className="table" style={{marginBottom: "0px !important"}}>
            <thead className="st-pricing-table-header">
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Price USD</th>
                <th scope="col">Claim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{getDisplayBalance(earnings)}</td>
                <td>{`≈ $${earnedInDollars}`}</td>
                <td>
                  <button 
                  onClick={onReward} 
                  type="button" 
                  disabled={earnings.eq(0) || !canClaimReward}
                  className="btn btn-outline-success m-b-xs">Claim</button>
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <Box mt={2} style={{ color: '#FFF' }}>
        {canClaimReward ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{ textAlign: 'center' }}>Claim possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Claim available in" />
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
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;

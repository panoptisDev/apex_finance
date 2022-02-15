import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import useStatsForPool from '../../hooks/useStatsForPool';

const CemeteryCard = ({ bank }) => {
  const statsOnPool = useStatsForPool(bank);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <ul className="list-group card-bg st-pricing-table">
        <li className="list-group-item">
          <h3 className="st-pricing-table-header">{bank.depositTokenName}</h3>
          <p>Deposit {bank.depositTokenName.toUpperCase()} and earn {` ${bank.earnTokenName}`}</p>
        </li>
        <li className="list-group-item">
          <table className="table" style={{marginBottom: "0px !important"}}>
            <thead className="st-pricing-table-header">
              <tr>
                <th scope="col">APR</th>
                <th scope="col">Daily APR</th>
                <th scope="col">TVL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</td>
                <td>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</td>
                <td>${statsOnPool?.TVL}</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li className="list-group-item">
          <Link to = {`/cemetery/${bank.contract}`}>
            <button type="button" className="btn btn-outline-success m-b-xs">
              View Farm
            </button>
          </Link>
        </li>
      </ul>
    </Grid>
  );
};

export default CemeteryCard;

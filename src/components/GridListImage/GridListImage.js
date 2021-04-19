import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 250
  },
}));

export default function CenteredGrid({item}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid item xs={12}>
          <img src={item.banner}></img>
        </Grid>
        <Grid item xs={6}>
          <img src={item.hinh}></img>
        </Grid>
    </div>
  );
}
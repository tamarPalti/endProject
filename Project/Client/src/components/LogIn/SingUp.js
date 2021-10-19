import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import './SingUp.scss';
import Paper from '@material-ui/core/Paper';
import BasicDetails from './BasicDetails';
import { Route } from 'react-router-dom';
import ExpandingDetails from './ExpandingDetails';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',

  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ff716e',
    width: "65px",
    height: "65px",

  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#ff716e'
  },

}));


function SignUp(props) {

  const classes = useStyles();


  useEffect(() => {
  }, [])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={10} md={7} component={Paper} elevation={6} square >
        <div className="backrund"></div>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon style={{ "font-size": "2.5rem" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>



          <Route exact path={'/SignUp'}>
            <BasicDetails />
          </Route>
          <Route  path={'/SignUp/ExpandingDetails'}>
            <ExpandingDetails />
          </Route>

        </div>
      </Grid>
      <Grid item xs={12} sm={1} md={5} className={classes.image + " opcityandimg"} />
    </Grid>
  );
}
const mapStateToProps = (state) => {

  return {};
}
export default connect(mapStateToProps, {})(SignUp);
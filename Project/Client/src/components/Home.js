import React, { useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route, Switch } from 'react-router-dom';
import UsersSearch from './search/UseresSearch';
import BusinessSearch from './search/BusinessSearch';
import Search from './search/Search';
import { connect } from "react-redux";
import SingIn from './LogIn/singIn';
import SignUp from './LogIn/SingUp';
import PrivateArea from './PrivateArea/PrivateArea';
import './Home.scss';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import home2 from './img/home3.png';
const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));


const Home = (props) => {

    const classes = useStyles();

    useEffect(() => {

    })
    return (
        <>


            <Switch>

                <Route exact path={'/'}>
                    <div className="back-home">
                        <img src={home2} style={{ width: "100%" }}></img>
                        <div className="href">
                            <Link to="/SignUp" >
                                <ColorButton variant="contained" color="primary" className={classes.margin}>
                                    SignUp
                                </ColorButton>

                            </Link>
                            <Link to="/SignIn" >
                                <ColorButton variant="contained" color="primary" className={classes.margin}>
                                    SingIn
                                </ColorButton>
                            </Link>
                        </div>
                        <div className="href2">
                            <Link to="/SignUp" >
                                <ColorButton variant="contained" color="primary" style={{"border-radius": "19px"}} className={classes.margin+" search"}>
                                    Search Users
                                </ColorButton>

                            </Link>
                            <Link to="/SignIn" >
                                <ColorButton variant="contained" color="primary" style={{"border-radius": "19px"}} className={classes.margin+" search"}>
                                    Search Buisness
                                </ColorButton>
                            </Link>
                        </div>
                    </div>
                </Route>

                <Route path={'/Search'}>

                    <Search />
                </Route>
                <Route path={'/SignUp'}>
                    <SignUp />
                </Route>
                <Route path={'/PrivateArea'}>
                    <PrivateArea />
                </Route>
                <Route path={'/SignIn'}>
                    <SingIn />
                </Route>
            </Switch>
        </>
    );
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps, {})(Home); 

import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
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
import Manager from '../components/Manager/Manager';
import { GetCurrentUser as GetCurrentUser2, CheckManager } from '../util/index';
import Page404 from './404/Page404';
import UpdataBusiness from './Tasks/UpdataBusiness';
import UpdataUser from './Tasks/UpdataUser';
import ForgotPassword from './LogIn/ForgotPassword';
import Heder from './Heder';
import ExpandingDetails from './LogIn/ExpandingDetails';
import PrivateNew from './PrivateArea/privatenew';
import ChartPage from './ChartPage/ChartPage'



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

    const [ifGoToLogin, setifGoToLogin] = useState(false);
    const [ifGoTo404, setifGoToifGoTo404] = useState(false);

    useEffect(async () => {

        localStorage.setItem("managerMail", "m1a2n3a4g5e6r@gmail.com");
        localStorage.setItem("managerId", "M11223344");

        GetCurrentUser2().catch(error => { setifGoToLogin(true) });

        let if404 = await CheckManager(localStorage.getItem("currentUserMail"), localStorage.getItem("currentUserPassword"));
        if (!if404 === true)
            setifGoToifGoTo404(true);

    }, []);


    return (
        <>
            <Heder />
            <Switch>

                <Route exact path={'/'}>
                    <div className="back-home">
                        <img src={home2} style={{ width: "100%", marginTop: "19%" }}></img>
                        <div className="href2">
                            <Link to="/SignUp"  >
                                <ColorButton variant="contained" color="primary" style={{ "border-radius": "29px 29px 29px 29px", "background-color": "#fb7375" }} className={classes.margin + " search"}>
                                    SignUp
                                </ColorButton>

                            </Link>
                            <Link to="/SignIn"  >
                                <ColorButton variant="contained" color="primary" style={{ "border-radius": "29px 29px 29px 29px", "background-color": "#1f284f" }} className={classes.margin + " search"}>
                                    SingIn
                                </ColorButton>
                            </Link>
                        </div>
                    </div>
                </Route>

                <Route path={'/search/business/TasksUpdataBusiness/:idBusiness'}>

                    <UpdataBusiness />
                </Route>
                <Route path={'/search/users/TasksUpdataUser/:idUser'}>
                    <UpdataUser />
                </Route>
                <Route path={'/Search'}>
                    {!ifGoToLogin ? <Search /> : <Redirect to={'/SignIn'} />}
                </Route>
                <Route path={'/Manager'}>
                    {!ifGoTo404 ? <Manager /> : <Redirect to={'/Page404'} />}
                </Route>
                <Route path={'/SignUp'}>
                    <SignUp />
                </Route>

                <Route path={'/ForgotPassword'}>
                    <ForgotPassword />
                </Route>
                {/* <Route path={'/PrivateArea'}>
                    {!ifGoToLogin ? <PrivateArea /> : <Redirect to={'/Page404'} />}
                </Route> */}

                <Route path={'/PrivateArea'}>
                    {!ifGoToLogin ? <PrivateNew /> : <Redirect to={'/Page404'} />}
                </Route>


                <Route path={'/Page404'}>
                    <Page404 />
                </Route>
                <Route path={'/SignIn'}>
                    <SingIn />
                </Route>
                <Route path={'/ChartPage'}>
                    <ChartPage />
                </Route>
                <Route>
                    <Page404 />

                </Route>
            </Switch>
        </>
    );
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps, {})(Home); 

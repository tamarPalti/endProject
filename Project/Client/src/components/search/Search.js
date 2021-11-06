import { connect } from "react-redux";
import { GetCurrentUser, SignOut } from '../../actions/index';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState, useRef } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../search/Search.scss'
import 'semantic-ui-css/semantic.min.css';
import { Route } from 'react-router-dom';
import UsersSearch from './UseresSearch';
import BusinessSearch from './BusinessSearch';
import ResultSearchUser from './ResultSearchUser';
import ResultSearchBusiness from './ResultSearchBusiness';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';

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
        // backgroundImage:'url(./img/back.png)'
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
    margin: {
        margin: theme.spacing(1),
    },
}));
const Search = (props) => {

    const [value, setValue] = useState('two');
    const [CircularProgresState, setCircularProgresState] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    let users = useRef();
    let business = useRef();


    const history = useHistory();
    const changeHistory = (path) => {
        history.push(path);
    }

    const styleTab1 = { "font-weight": "bold", "font-size": "16px", "margin-right": "6px", "color": "rgb(11, 11, 43)" }
    const styleTab2 = { "font-weight": "bold", "font-size": "16px", "color": "rgb(11, 11, 43)" }
    const styleTabs = { "width": "100em", "margin-left": "-31%" }
    const styleBox = { "margin-top": "175px", "margin-left": "760px" }

    const styleGrid = { "max-width": "32.333333%", "overflow": "scroll", "margin-top": "6%", "width": "100%", "box-shadow": "2px 2px 2px 2px grey" }

    const divSearch = { "width": "71%", "margin-left": "45%", "margin-top": "2%" }

    const setCircularProgresStateFunc=(val)=>{
        setTimeout(() => {
            setCircularProgresState(val);
        }, 5000);
    }
    useEffect(() => {

    }, []);

    return (
        <>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square style={styleGrid}>

                    <Route path="/search/users">

                        <ResultSearchUser />

                    </Route>

                    <Route path="/search/business">

                        {CircularProgresState ? <Box sx={{ display: 'flex' }} style={{ "margin-top": "60%", "margin-left": "45%" }}>
                            <CircularProgress />
                        </Box> : <ResultSearchBusiness />}

                    </Route>
                </Grid>

                <Grid item xs={12} sm={1} md={5} style={{ "max-width": "62.6667%" }}>

                    <Box style={styleBox}>

                        <Tabs
                            value={value}
                            onChange={handleChange}

                            aria-label="secondary tabs example"
                            style={styleTabs}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "rgb(255, 113, 110)"
                                }
                            }}
                        >
                            <Tab value="one" style={styleTab1} label="חיפוש עסקים" onClick={() => changeHistory('/search/business')} />

                            <Tab value="two" style={styleTab2} label="חיפוש אנשים" onClick={() => changeHistory('/search/users')} />

                        </Tabs>

                    </Box>
                    <div style={divSearch}>
                        <Route path="/search/users">
                            <>  <UsersSearch /></>
                        </Route>

                        <Route path="/search/business">
                            <>    <BusinessSearch setCircularProgresStateFunc={setCircularProgresStateFunc} /></>
                        </Route>
                    </div>
                </Grid>
            </Grid>
        </>


    );
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps, { GetCurrentUser })(Search);
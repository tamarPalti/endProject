import * as React from 'react';
import './privateNew.scss';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
<<<<<<< HEAD
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom'
=======
import { Link, Route, useRouteMatch, useLocation } from 'react-router-dom'
>>>>>>> 2926b1513bf799e9595517f70dd5da3e17e57228
import UpdatePersonalDetails from './UpdatePersonalDetails';
import Grid from '@material-ui/core/Grid';
import BusinessInformationUpdate from './BusinessInformationUpdate';
import AddingBusiness from './AddingBusiness';
import ScrollableTabsButtonAuto from './SearchHistory';
import Tasks from './Tasks';
import { useState, useEffect } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';

const PrivateNew = (props) => {

    const { url, path } = useRouteMatch();
    const { pathname } = useLocation();
<<<<<<< HEAD
    const [colorIndex, setColorIndex] = useState(1);
=======
    const [colorIndex, setColorIndex] = useState(0);
>>>>>>> 2926b1513bf799e9595517f70dd5da3e17e57228

    const styleIcon = {
        "width": "96%",
        "height": "66%",
        "margin-top": "15%",
        "margin-left": "3%"
    }
<<<<<<< HEAD
    React.useEffect(() => {
       
        console.log(pathname);
       
      })
    return (<>
        {pathname!=`/PrivateArea/Tasks/addUser`&&pathname!=`/PrivateArea/Tasks/addCategory`&&
        
        < div >
        <Grid container spacing={2} style={{
            "width": "calc(100% + 16px)",
            "margin": "-8px",
            "height": "54.4em"
        }}>

            <Grid item xs={12} sm={4} style={{ "height": "100%" }}>
                <div className="divAll">

                    <div className="path">
=======
    useEffect(() => {
        
        // console.log(pathname);

    }, [])
    return (
        <div>
            <Grid container spacing={2} style={{
                "width": "calc(100% + 16px)",
                "margin": "-8px",
                "height": "54.4em"
            }}>
>>>>>>> 2926b1513bf799e9595517f70dd5da3e17e57228

                        <Link to={url + "/personalDetiles"}>

                            <div className="circle" onClick={() => setColorIndex(1)} className={colorIndex == 1 ? "blue circle" : "circle"}>
                                <ManageAccountsIcon style={styleIcon} className={colorIndex == 1 ? "white" : ""} /></div>
                        </Link>

                        <Link to={url + "/BusinessInformationUpdate"}>

                            <div onClick={() => setColorIndex(2)} className={colorIndex == 2 ? "blue circle" : "circle"}>
                                <WorkIcon style={styleIcon} className={colorIndex == 2 ? "white" : ""} /></div>
                        </Link>

                        <Link to={url + "/AddingBusiness"}>

                            <div className="circle" onClick={() => setColorIndex(3)} className={colorIndex == 3 ? "blue circle" : "circle"}>
                                <WorkIcon style={styleIcon} className={colorIndex == 3 ? "white" : ""} /></div>
                        </Link>

                        <Link to={url + "/ScrollableTabsButtonAuto"}>

                            <div className="circle" onClick={() => setColorIndex(4)} className={colorIndex == 4 ? "blue circle" : "circle"}>
                                <SearchIcon style={styleIcon} className={colorIndex == 4 ? "white" : ""} /></div>
                        </Link>

                        <Link to={url + "/Tasks"} onClick={() => { setTimeout(() => window.location.reload(), 10) }}>

                            <div className="circle" onClick={() => setColorIndex(5)} className={colorIndex == 5 ? "blue circle" : "circle"}>
                                <AssignmentIcon style={styleIcon} className={colorIndex == 5 ? "white" : ""} /></div>
                        </Link>

                    </div>


<<<<<<< HEAD
                </div>
            </Grid>
            <Grid item xs={12} sm={1} md={8} style={{ "margin-top": "312px", "margin-left": "-151px" }}>
=======
                                <div className="circle" onClick={() => setColorIndex(5)} className={pathname.indexOf("Tasks") !=-1 ? "blue circle" : "circle"}>
                                    <AssignmentIcon style={styleIcon} className={pathname.indexOf("Tasks") !=-1 ? "white" : ""} /></div>
                            </Link>
>>>>>>> 2926b1513bf799e9595517f70dd5da3e17e57228

                <Route path={path + "/personalDetiles"} >

                    <UpdatePersonalDetails />
                </Route>

                <Route path={path + "/BusinessInformationUpdate"} >
                    <div style={{ "margin-top": "-23%" }}>
                        <BusinessInformationUpdate />
                    </div>
<<<<<<< HEAD
                </Route>

                <Route path={path + "/AddingBusiness"} >

                    <AddingBusiness />
                </Route>

                <Route path={path + "/ScrollableTabsButtonAuto"} >
                    <ScrollableTabsButtonAuto />
                </Route>


                <Route path={path + "/Tasks"} >
                    <Tasks />
                </Route>

=======
                </Grid>
                <Grid item xs={12} sm={1} md={8} style={{ "margin-top": "312px", "margin-left": "-151px" }}>

                    <Route path={path + "/personalDetiles"} >

                        <UpdatePersonalDetails />
                    </Route>

                    <Route path={path + "/BusinessInformationUpdate"} >
                        <div style={{ "margin-top": "-23%" }}>
                            <BusinessInformationUpdate />
                        </div>
                    </Route>

                    <Route path={path + "/AddingBusiness"} >

                        <AddingBusiness />
                    </Route>

                    <Route path={path + "/ScrollableTabsButtonAuto"} >
                        <ScrollableTabsButtonAuto />
                    </Route>


                    <Route path={path + "/Tasks"} >
                        <Tasks />
                    </Route>

                </Grid>
>>>>>>> 2926b1513bf799e9595517f70dd5da3e17e57228
            </Grid>
        </Grid>
        </div>}</>


    );
}

export default PrivateNew;
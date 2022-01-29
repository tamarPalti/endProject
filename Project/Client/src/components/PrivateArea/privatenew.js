import * as React from 'react';
import './privateNew.scss';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
<<<<<<< HEAD
import { Link, Route, useRouteMatch, useLocation } from 'react-router-dom'
=======
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom'
>>>>>>> 0780d6f486cb05c7f0cd0304647fb6b97a8beeb3
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
    const [colorIndex, setColorIndex] = useState(0);
=======
    const [colorIndex, setColorIndex] = useState(1);
>>>>>>> 0780d6f486cb05c7f0cd0304647fb6b97a8beeb3

    const styleIcon = {
        "width": "96%",
        "height": "66%",
        "margin-top": "15%",
        "margin-left": "3%"
    }
    React.useEffect(() => {
<<<<<<< HEAD
=======
       
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

                        <Link to={url + "/personalDetiles"}>

                            <div className="circle" onClick={() => setColorIndex(1)} className={colorIndex == 1 ? "blue circle" : "circle"}>
                                <ManageAccountsIcon style={styleIcon} className={colorIndex == 1 ? "white" : ""} /></div>
                        </Link>
>>>>>>> 0780d6f486cb05c7f0cd0304647fb6b97a8beeb3

        console.log(pathname);

    })
    return (<>
        {pathname != `/PrivateArea/Tasks/addUser` && pathname != `/PrivateArea/Tasks/addCategory` &&

            < div >
                <Grid container spacing={2} style={{
                    "width": "calc(100% + 16px)",
                    "margin": "-8px",
                    "height": "54.4em"
                }}>

                    <Grid item xs={12} sm={4} style={{ "height": "100%" }}>
                        <div className="divAll">

                            <div className="path">

                                <Link to={url + "/personalDetiles"}>

                                    <div className="circle" onClick={() => setColorIndex(1)} className={colorIndex == 1 ? "blue circle" : "circle"}>
                                        <ManageAccountsIcon style={styleIcon} className={colorIndex == 1 ? "white" : ""} /></div>
                                </Link>

                                <Link to={url + "/BusinessInformationUpdate"}>

                                    <div onClick={() => setColorIndex(2)} className={colorIndex == 2 ? "blue circle" : "circle"}>
                                        <WorkIcon style={styleIcon} className={colorIndex == 2 ? "white" : ""} /></div>
                                </Link>

<<<<<<< HEAD
                                <Link to={url + "/AddingBusiness"}>
=======
                </div>
            </Grid>
            <Grid item xs={12} sm={1} md={8} style={{ "margin-top": "312px", "margin-left": "-151px" }}>
>>>>>>> 0780d6f486cb05c7f0cd0304647fb6b97a8beeb3

                                    <div className="circle" onClick={() => setColorIndex(3)} className={colorIndex == 3 ? "blue circle" : "circle"}>
                                        <WorkIcon style={styleIcon} className={colorIndex == 3 ? "white" : ""} /></div>
                                </Link>

                                <Link to={url + "/ScrollableTabsButtonAuto"}>

<<<<<<< HEAD
                                    <div className="circle" onClick={() => setColorIndex(4)} className={colorIndex == 4 ? "blue circle" : "circle"}>
                                        <SearchIcon style={styleIcon} className={colorIndex == 4 ? "white" : ""} /></div>
                                </Link>
=======
                <Route path={path + "/BusinessInformationUpdate"} >
                    <div style={{ "margin-top": "-23%" }}>
                        <BusinessInformationUpdate />
                    </div>
                </Route>
>>>>>>> 0780d6f486cb05c7f0cd0304647fb6b97a8beeb3

                                <Link to={url + "/Tasks"} onClick={() => { setTimeout(() => window.location.reload(), 10) }}>

                                    <div className="circle" onClick={() => setColorIndex(5)} className={colorIndex == 5 ? "blue circle" : "circle"}>
                                        <AssignmentIcon style={styleIcon} className={colorIndex == 5 ? "white" : ""} /></div>
                                </Link>

                            </div>


                        </div>
                    </Grid>

<<<<<<< HEAD
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
                   
                </Grid>
            </div>}</>
=======
            </Grid>
        </Grid>
        </div>}</>
>>>>>>> 0780d6f486cb05c7f0cd0304647fb6b97a8beeb3


    );
}

export default PrivateNew;
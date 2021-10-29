import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useRef, useEffect, useState } from 'react';
import { GetAllTask, GetAllTypeTsks, GetTaskById, SendMail } from '../../util/index';
import { Link, Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import UpdatePersonalDetails from '../PrivateArea/UpdatePersonalDetails';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from "react-redux";
import { ChangeIdUserManagerUpdate } from '../../actions/index';
import { setTimeout } from 'timers';
import UpdateBuisnes from '../PrivateArea/UpdateBuisness/UpdateBuisnes';
import UpdateBuisnesOfManager from './UpdateBuisnesOfManager';
import AddCategory from './AddCategory';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UpdateStatusTask } from '../../util/index';
import { Grid } from '@mui/material';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row, action } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    // const { idTask } = useParams();
    const [check, setCheck] = useState(false)
    onchange = (e, id) => {
        console.log(e);
        setCheck(e.target.checked);
        if (e.target.checked == true) {
            UpdateStatusTask(id, true);
        }
        else {
            UpdateStatusTask(id, false);
        }

    }
    return (
        <React.Fragment>
            <TableRow className={classes.root}>

                <TableCell align="right">{action}</TableCell>
                <TableCell align="right">{row.type.name}</TableCell>
                <TableCell align="right">{row.desription}</TableCell>
                <TableCell align="right">{row.codeUser.firstName}&nbsp;{row.codeUser.lastName}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right"> <FormControlLabel control={<Checkbox onChange={(e) => onchange(e, row._id)} />} label="" /></TableCell>
            </TableRow>

        </React.Fragment>
    );
}

function TableTasks(props) {

    const { idTask } = useParams();
    const [ifTasks, setifTasks] = useState(true);

    const send = (idTask, mail) => {
        let Email = {
            toUser: mail,
            subject: "הצטרפות לאתר מי מייל",
            text: `<h1>${"הצטרפות לאתר מי מייל"}</h1>`
            // ,attachments
        }
        SendMail(Email);
    }


    const [rows, setRows] = useState([]);
    const [typeTask, setTypeTask] = useState([]);

    const { url, path } = useRouteMatch();

    useEffect(() => {

        GetAllTypeTsks().then(succ => {

            let typeArr = [];
            succ.data.forEach(element => {


                if (element.code == 1)
                    typeArr[0] = { id: element._id, action: (id, idTask) => <Link to={`${url}/updateUser/${id}/${idTask}`} onClick={() => { setTimeout(() => window.location.reload(), 10) }}>עדכון משתמש</Link> };
                else if (element.code == 2)
                    typeArr[1] = { id: element._id, action: (id, idTask) => <Link to={`${url}/addCategory/${idTask}`} onClick={() => { setTimeout(() => window.location.reload(), 10) }}>הוסף קטגוריה</Link> }
                else if (element.code == 3)
                    typeArr[2] = { id: element._id, action: (mail, idTask) => <button onClick={() => { send(idTask, mail) }} >הוסף משתמש למערכת</button> }
                else if (element.code == 4)
                    typeArr[3] = { id: element._id, action: (id, idTask) => <Link to={`${url}/updateBuisness/${id}/${idTask}`} onClick={() => { setTimeout(() => window.location.reload(), 10) }}>עדכן עסק</Link> }


            });

            setTypeTask(typeArr);

        }).catch(error => console.log(error));

        GetAllTask().then(succ => {
            setRows(succ.data);
        }).catch(erorr => {
            console.log(erorr);
        });

        GetTaskById(idTask).then(succ => {
            if (succ.data.status == true)
                setifTasks(false);
        }).catch(() => {

        });
    }, []);
    return (<>{rows && <>

        <Grid container spacing={1} style={{ "margin-top": "7%" }}>
            <Grid item xs={12} sm={6} style={{ "margin-top": "12%", "margin-left": "3%" }}>
                <Switch>

                    <Route path={`${path}/updateUser/:id/:idTask`}>

                        {ifTasks && <UpdatePersonalDetails iconH="2.5em" iconW="15%" imgW="64%" imgH="11em" />}
                    </Route>

                    <Route path={`${path}/addCategory/:idTask`}>
                        {ifTasks && <AddCategory />}
                    </Route>

                    <Route path={`${path}/updateBuisness/:id/:idTask`}>
                        {ifTasks && <UpdateBuisnesOfManager />}
                    </Route>

                </Switch>
            </Grid>

            <Grid item xs={12} sm={4} style={{ "margin-left": "4%", "margin-top": "4%", "max-width": "50.333333%" }}>






                <TableContainer component={Paper} >
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>

                                <TableCell align="right">ביצוע</TableCell>
                                <TableCell align="right">משימה</TableCell>
                                <TableCell align="right">תאור</TableCell>
                                <TableCell align="right">משתמש</TableCell>
                                <TableCell align="right">תאריך</TableCell>
                                <TableCell align="right">סטטוס</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typeTask && rows.map((row, index) => (
                                <Row key={index} row={row} action={typeTask.find(elem => elem.id === row.type._id)
                                    .action(row.otherUser ? row.otherUser._id : row.otherbuisness ? row.otherbuisness._id : row.mail ? row.mail : null
                                        , row._id)} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </>
    }</>
    );
}
const mapStateToProps = (state) => {

    return {};
}
export default connect(mapStateToProps, { ChangeIdUserManagerUpdate })(TableTasks);
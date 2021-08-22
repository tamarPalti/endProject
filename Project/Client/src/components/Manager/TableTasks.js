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
import { GetAllTask } from '../../util/index';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

// function createData(task, desription, user, date) {
//     return {
//         task,
//         desription: { desription: desription, otherUser: otherUser },
//         user,
//         date,
//     };
// }

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right">
                    {row.type}
                </TableCell>
                <TableCell align="right">{row.desription}</TableCell>
                <TableCell align="right">{row.codeUser.firstName}&nbsp;{row.codeUser.lastName}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography align="right" variant="h6" gutterBottom component="div">
                                תאור
                              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">תאור</TableCell>
                                        {row.otherUser && <TableCell align="right">משתמש לעדכון</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="right" component="th" scope="row"> {row.desription} </TableCell>

                                        {row.otherUser && <TableCell align="right">{row.otherUser.firstName}&nbsp;{row.otherUser.lastName}</TableCell>}
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function TableTasks() {
    const [rows, setRows] = useState([]);



    
    useEffect(() => {

        GetAllTask().then(succ => {
            setRows(succ.data);
        }).catch(erorr => {
            console.log(erorr);
        })
    }, [])
    return (rows &&
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {/* <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{ 'aria-label': 'select all desserts' }}
                            />
                        </TableCell> */}
                        <TableCell align="right">משימה</TableCell>
                        <TableCell align="right">תאור</TableCell>
                        <TableCell align="right">משתמש</TableCell>
                        <TableCell align="right">תאריך</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
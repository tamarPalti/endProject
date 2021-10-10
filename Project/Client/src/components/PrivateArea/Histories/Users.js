import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Users.scss'
import { GetCurrentUser, DeleteHistoryUsers } from '../../../util/index';
import User from "../../search/User";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    style: {
        maxWidth: "32%"
    }
}));

const Users = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [ifGoToLogin, setifGoToLogin] = useState(false);

    const classes = useStyles();
    // const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const GetCuccentUserFunc = async () => {

        GetCurrentUser().then(succ => setCurrentUser(succ.data)).catch(() => setifGoToLogin(true));

    }
    const DeleteHistoryFunc = async (index) => {

        DeleteHistoryUsers(index).then(succ => {
            if (succ.status == 200)
                GetCuccentUserFunc();
        })

    }


    useEffect(() => {
        GetCuccentUserFunc();
    }, []);

    return (<>
        {currentUser ?
            <>
                <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                        <List>
                            {
                                currentUser.lastSearchUsers.map((item, index) => {
                                    if (index < 10 && item.userSearch)
                                        return (<ListItem>
                                            <ListItemAvatar>
                                                <IconButton edge="end" aria-label="delete" onClick={() => DeleteHistoryFunc(index)}>
                                                    <DeleteIcon style={{ "font-size": "1.5em" }} />
                                                </IconButton>

                                            </ListItemAvatar>
                                            {/* <p>{item.date}</p> */}
                                            <ListItemText
                                                primary={<User ifAdd="false" user={item.userSearch} key={index} />}
                                                secondary={secondary ? 'Secondary text' : null}
                                            />
                                        </ListItem>)
                                })
                            }
                        </List>
                    </div>
                </Grid>
            </>
            : null}

    </>);
}

export default Users;


































// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import FolderIcon from '@material-ui/icons/Folder';
// import DeleteIcon from '@material-ui/icons/Delete';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//   },
// }));

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

// export default function InteractiveList() {
//   const classes = useStyles();
//   const [dense, setDense] = React.useState(false);
//   const [secondary, setSecondary] = React.useState(false);

//   return (
//     <div className={classes.root}>
//       <FormGroup row>
//         <FormControlLabel
//           control={
//             <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
//           }
//           label="Enable dense"
//         />
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={secondary}
//               onChange={(event) => setSecondary(event.target.checked)}
//             />
//           }
//           label="Enable secondary text"
//         />
//       </FormGroup>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Text only
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Icon with text
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemIcon>
//                     <FolderIcon />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//       </Grid>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Avatar with text
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar>
//                       <FolderIcon />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Avatar with text and icon
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar>
//                       <FolderIcon />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                   <ListItemSecondaryAction>
//                     <IconButton edge="end" aria-label="delete">
//                       <DeleteIcon />
//                     </IconButton>
//                   </ListItemSecondaryAction>
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
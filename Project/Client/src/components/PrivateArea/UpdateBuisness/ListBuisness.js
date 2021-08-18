import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import UpdateBuisness from './UpdateBuisnes';
import { ChangeUpdateBuisness } from '../../../actions/index';
import { connect } from "react-redux";

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
}));

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

function ListBuisness(props) {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [listBuisness, setlistBuisness] = React.useState([]);

    const [indexUpdate, setindexUpdate] = useState(0);


    const GetAllBuisnessOfUser = async () => {
        axios.get(`http://localhost:4000/business/getListBuisnessByIdUser/${localStorage.getItem("currentUserId")}`).then(data => {

            console.log(data.data);
            setlistBuisness(data.data);
            props.ChangeUpdateBuisness(data.data[0]._id);

        }).catch(error => {
            console.log(error);

        })
    }
    useEffect(() => {
        GetAllBuisnessOfUser();
    }, [])

    return (
        <div className={classes.root}>
            {listBuisness.length > 0 && <Grid container spacing={2}>
                <Grid item xs={9} md={8}>
                    <Typography variant="h6" className={classes.title}>

                    </Typography>
                    <div className={classes.demo}>
                        <List>
                            {listBuisness && listBuisness.map((item, index) => {
                                return (
                                    <ListItem onClick={() => props.ChangeUpdateBuisness(item._id)}>
                                        <ListItemAvatar>
                                            <IconButton edge="end" >
                                                <Avatar>
                                                </Avatar>
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </div>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                    <UpdateBuisness id={props.updateBuisness} />
                </Grid> */}
            </Grid>}
        </div>
    );
}
const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness })(ListBuisness);
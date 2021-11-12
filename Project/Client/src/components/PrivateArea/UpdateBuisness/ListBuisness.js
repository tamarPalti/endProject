import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ChangeUpdateBuisness } from '../../../actions/index';
import { connect } from "react-redux";
import { GetCurrentBuisness, GetAllBuisnessOfUser, deleteBuisness } from '../../../util/index';
import UpdateBuisness from './UpdateBuisnes';
import MiniUpdate from './MiniUpdate';
import ico from '../../search/img/person.png';
import { Image } from 'semantic-ui-react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

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


function ListBuisness(props) {

    //#region Modal
    const [open, setOpen] = React.useState(false);

    const concelationDelete = () => {
        setOpen(false);
    }
    const deleteBuisnessFunc = (id) => {

        deleteBuisness(id).then(() => {
            GetCurrentBuisnessFunc();

        });
        setOpen(false);
    }


    const styleDivContent = { "margin-top": "0", "border-top-right-radius": 0, "border-top-left-radius": 0 }
    const styleDivW = { "position": "relative", "top": "27%" }
    const styleAction = { "height": "3em", "margin-top": "10%" }
    const styleIconUser = { "margin-left": "-2em", "color": "white" }
    const styleP = { "color": "white", "padding-top": "5%" }
    const styleIconExport = { "margin-left": "3em", "color": "white" }

    //#endregion








    const classes = useStyles();
    const [secondary, setSecondary] = React.useState(false);
    const [listBuisness, setlistBuisness] = React.useState([]);


    const GetCurrentBuisnessFunc = () => {

        GetAllBuisnessOfUser().then(data => {
            console.log(data.data);
            setlistBuisness(data.data);
            if (props.updateBuisness == null)
                props.ChangeUpdateBuisness(data.data[0]);

        }).catch(error => {
            console.log(error);

        });

    }
    const ChangeUpdateBuisness = (id) => {

        GetCurrentBuisness(id).then(data => {
            props.ChangeUpdateBuisness(data.data);
        }).catch(error => {
            console.log(error);
        });
    }
    const [ifNone, setifNone] = React.useState(false);

    //style 
    const styleItem = {
        "height": "3em", "width": "48%", "padding-top": "56px", "background-color": "#0b0b2b",
        "color": "white"
    }
    const styleText = { "margin-left": "20%", "margin-top": "-19%" }
    const styelIcon = { "position": "relative", "left": "-66%", "bottom": "1.5rem" }
    useEffect(() => {

        GetCurrentBuisnessFunc();

    }, []);

    return (
        <div className={classes.root}>
            {listBuisness.length > 0 ? <Grid container spacing={2}>
                <Grid item xs={9} md={8}>
                    <Typography variant="h6" className={classes.title}>

                    </Typography>
                    <div className={classes.demo}>
                        <List>
                            {listBuisness && listBuisness.map((item, index) => {
                                return (
                                    <>
                                        <ListItem onClick={() => {
                                            ChangeUpdateBuisness(item._id)


                                        }}
                                            style={styleItem}
                                        >
                                            <ListItemAvatar style={{ "margin-left": "-7%" }}>
                                                {/* <Image size='medium'  src={item.img ? item.img : ico} wrapped /> */}
                                                <Image
                                                    style={{
                                                        "margin-top": "-69%",
                                                        "margin-left": " 17px",
                                                        "height": "50px",
                                                        "width": "50px", "border-radius": "28px"
                                                    }} src={item.img && item.img !== "undefined" ? item.img : ico}>

                                                </Image>
                                            </ListItemAvatar>



                                            <Modal

                                                onClose={() => setOpen(false)}
                                                onOpen={() => setOpen(true)}
                                                open={open}
                                                trigger={
                                                    <ListItemAvatar style={styelIcon}>
                                                        <IconButton edge="end" aria-label="delete" >
                                                            <DeleteIcon style={{ "font-size": "1.5em" }} onClick={()=> ChangeUpdateBuisness(item._id)}/>
                                                        </IconButton>
                                                    </ListItemAvatar>
                                                }
                                                style={{ "height": "17.5em" }}
                                            >
                                                <div className="div_content" style={styleDivContent}>
                                                    <p style={styleP}>  Are You Shur That You Whant To Delete The Busness?</p>

                                                </div>

                                                <Modal.Actions style={styleAction}>

                                                    <div style={{ "margin-top": "-34.3%" }}>
                                                            
                                                        <div className="div-ico" style={{ "margin-right": "32%", "margin-top": "32%" }} data-tooltip="מחק">
                                                        <IconButton edge="end" aria-label="delete"  onClick={() => deleteBuisnessFunc(props.updateBuisness._id)}>
                                                            <DeleteIcon style={{ "font-size": "1.5em" }} />
                                                        </IconButton>
                                                            {/* <i class="user plus icon i" onClick={() => deleteBuisnessFunc(item._id)} style={styleIconUser}></i> */}
                                                        </div>

                                                        <div className="div-ico" data-tooltip="סגור">
                                   
                                                            <i class="delete icon" onClick={concelationDelete} style={styleIconExport} ></i>
                                                        </div>

                                                    </div>

                                                </Modal.Actions>
                                            </Modal>



                                            <ListItemText
                                                primary={item.name}
                                                secondary={secondary ? 'Secondary text' : null}
                                                style={styleText}
                                            />
                                        </ListItem>
                                        <div style={{ "height": "9px" }}></div>
                                        {<MiniUpdate item={item} />}
                                        <div>
                                            <UpdateBuisness GetAllBuisnessOfUser={GetCurrentBuisnessFunc} id={item._id} />
                                        </div>
                                    </>
                                )
                            })}
                        </List>
                    </div>
                </Grid>

            </Grid> : null}
        </div>
    );
}
const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness })(ListBuisness);
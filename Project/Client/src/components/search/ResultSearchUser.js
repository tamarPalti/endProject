import User from "./User";
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { useEffect } from 'react';
import { GetCurrentUser } from '../../actions/index';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import './ReasulSearchUser.scss';

const ResultSearchUser = (props) => {

    const styleListItem={"height": "35%","border-bottom-style": "groove","max-width": "max-width: 100%"}

    useEffect(() => {
    }, []);
    return (<>
        {
           <Box
           sx={{ width: '100%', height: 250, bgcolor: 'background.paper' }}
         >
            {props.UserSearch && props.UserSearch.map((item,index) => {
                return (
                        <ListItem   key={index} component="div" disablePadding style={styleListItem}>
                            <ListItemButton style={{"height": "100%"}}>
                                <User ifAdd="true" key={item._id} user={item} />
                            </ListItemButton>
                        </ListItem>
                );
            })} </Box>}
    </>);
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser, UserSearch: state.usersPart.UserSearch };
}
export default connect(mapStateToProps, { GetCurrentUser })(ResultSearchUser); 
import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import business from '../../classes/business'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Redirect } from 'react-router-dom';
import { getAllCategories, UpdateBuisnessFunc } from '../../../util/index';
import { Multiselect } from "multiselect-react-dropdown";
import { ChangeUpdateBuisness } from '../../../actions/index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Input from '@mui/material/Input';
import person from '../../search/img/person.png';
function MiniUpdate(props) {
  
   
    const styleDiv1 = {
       
    }
    const styleDiv = {
        "display":"none",
        "height":"96px"
    }
    return (
             <>
                <Grid style={styleDiv} >{props.item.name}{console.log(props)}</Grid>
                <Grid style={styleDiv}>{props.item.phoneNamber[0]}</Grid>
                <Grid style={styleDiv}>{props.item.email}</Grid>
             </>
    );
}
const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness })(MiniUpdate);

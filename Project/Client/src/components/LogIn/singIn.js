import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { useEffect, useState,useRef } from "react";
import { GetCurrentUser,ChangeSingUp} from '../../actions/index';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';
import SingUp from './SingUp';
const SingIn = (props) => {
    let password=useRef();
    let mail=useRef();
    return(<Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Usermail'
            placeholder='Usermail'
            ref={mail}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            ref={password}
          />

          <Button content='Login' primary onClick={()=>{
              props.GetCurrentUser({"password":password.current,"mail":mail.current})

          }}/>
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' onClick={()=>{
            
           props.ChangeSingUp(true);
          }} />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>)
  
}
const mapStateToProps = (state) => {
    return {CurrentUser:state.usersPart.CurrentUser ,SingUp:state.usersPart.SingUp};
  }
export default connect(mapStateToProps, {GetCurrentUser ,ChangeSingUp})(SingIn);

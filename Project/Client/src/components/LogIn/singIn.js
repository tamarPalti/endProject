import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
<<<<<<< HEAD
import { useEffect, useState, useRef } from "react";
import { GetCurrentUser } from '../../actions/index';
=======
import { useEffect, useState,useRef } from "react";
import { GetCurrentUser,ChangeSingUp} from '../../actions/index';
>>>>>>> b2de03cf16488b704f08dfb60ee2d78042ef17e2
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';
import SingUp from './SingUp';
const SingIn = (props) => {
  let password;
  let mail;
  return (<Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
<<<<<<< HEAD
            label='Username'
            placeholder='Username'
            onKeyUp={(e)=>mail=e.target.value}
=======
            label='Usermail'
            placeholder='Usermail'
            ref={mail}
>>>>>>> b2de03cf16488b704f08dfb60ee2d78042ef17e2
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            onKeyUp={(e)=>password=e.target.value}
          />

<<<<<<< HEAD
          <Button content='Login' primary onClick={() => {
            props.GetCurrentUser({ "password": password, "mail": mail })

          }} />
=======
          <Button content='Login' primary onClick={()=>{
              props.GetCurrentUser({"password":password.current,"mail":mail.current})

          }}/>
>>>>>>> b2de03cf16488b704f08dfb60ee2d78042ef17e2
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
<<<<<<< HEAD
  return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps, { GetCurrentUser })(SingIn);
=======
    return {CurrentUser:state.usersPart.CurrentUser ,SingUp:state.usersPart.SingUp};
  }
export default connect(mapStateToProps, {GetCurrentUser ,ChangeSingUp})(SingIn);
>>>>>>> b2de03cf16488b704f08dfb60ee2d78042ef17e2

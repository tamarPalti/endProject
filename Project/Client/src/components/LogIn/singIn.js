import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { useEffect, useState,useRef } from "react";
import { GetCurrentUser} from '../../actions/index';
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
            label='Mail'


            placeholder='Mail'

            onKeyUp={(e)=>mail=e.target.value}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            onKeyUp={(e)=>password=e.target.value}
          />
          <Link to="Search">
          <Button content='Login' primary onClick={() => {
            props.GetCurrentUser({ "password": password, "mail": mail })

          }} />
            </Link>
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
          <Link to="SignUp">
        <Button content='Sign up' icon='signup' size='big' onClick={()=>{
            
          }} />
          </Link>
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>)

}
const mapStateToProps = (state) => {

    return {CurrentUser:state.usersPart.CurrentUser ,SingUp:state.usersPart.SingUp};
  }
export default connect(mapStateToProps, {GetCurrentUser })(SingIn);


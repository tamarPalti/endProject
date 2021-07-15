import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { useEffect, useState,useRef } from "react";
import { } from '../../actions/index';
import ico from './img/alex.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const SingIn = () => {
    let password=useRef();
    let mail=useRef();
    return(<Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
            ref={mail}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            ref={password}
          />

          <Button content='Login' primary onClick=""/>
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>)
  
}
const mapStateToProps = (state) => {
    return {  };
  }
export default connect(mapStateToProps, { })(SingIn);

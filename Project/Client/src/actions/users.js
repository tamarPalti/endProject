import axios from 'axios';
import * as actionTypes from '../ActionTypes'


export const ShowSearch=(ifShow)=>{
  return{
      type:actionTypes.IF_SHOW_SEARCH,
      payload:ifShow
  }
}

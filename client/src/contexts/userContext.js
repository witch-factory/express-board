import React from 'react';
import axios from 'axios';

const apiGetToken=()=>{
  return async(state, dispatch)=>{
    axios
      .get(`api/auth/token`)
      .then(response=>response.data)
      .then(data=>data.userID)
      .then(user_id=>{
        if(user_id){
          dispatch({type:"GET_TOKEN", user_id});
        }
      })
      .catch(err=>console.log(err));
  }
}


const userReducer=(state, action)=>{
  switch(action.type){
    case 'GET_TOKEN':

  }
}
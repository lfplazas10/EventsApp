import React from "react";
import cookie from "react-cookies";

export function isUserLogged(){
  let session = cookie.load('PLAY_SESSION');
  if (session != undefined)
    return true;
  else
    return false;
};

export function logOutUser(){
  let session = cookie.remove('PLAY_SESSION');
};

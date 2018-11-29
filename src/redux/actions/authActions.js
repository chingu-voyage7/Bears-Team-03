import { LOGOUT } from '../types';
/*
 logout - synchronous action creator
 As action creator this function return an action, which can
 be considered as an object with a property named 'type' that
 identifies it
  */
const logoutAction = () => ({ type: LOGOUT });

export default logoutAction;

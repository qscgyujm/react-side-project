import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';

import { action as authAction } from '../redux/auth';

import ProtectLoginRoute from '../components/Protect/LoggedInRoute';
import ProtectLogoutRoute from '../components/Protect/LoggedOutRoute';

import Login from '../components/Login';
import RegisterProfile from '../components/RegisterProfile';
import Product from '../components/Product';
import SettingProduct from '../components/SettingProduct';
import EditProfile from '../components/EditProfile'

import GlobalStyle from '../styles/global';

function App(props) {
  console.log('App', props);
  // const { checkAuth } = props;

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <ProtectLogoutRoute path="/" exact={true} component={Login} />
        <ProtectLogoutRoute path="/register"  exact={true} component={RegisterProfile} />
        <ProtectLoginRoute path="/product" exact={true} component={Product} />
        <ProtectLoginRoute path="/setting_product" exact={true} component={SettingProduct} />
        <ProtectLoginRoute path="/edit_Profile" exact={true} component={EditProfile} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return state.auth;
}

// // const mapDispatchToProps = {
// //   hello: () => ({type: 'hello'}),
// // }

const mapDispatchToProps = (dispatch) => {
  const {
    checkAuth,
  } = authAction;

  return{
    ...bindActionCreators({
      checkAuth,
    }, dispatch),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(App);

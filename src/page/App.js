import React from 'react';
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { isNil } from 'lodash';

import { action as authAction } from '../redux/auth';

import ProtectLoginRoute from '../components/Protect/LoggedInRoute';
import ProtectLogoutRoute from '../components/Protect/LoggedOutRoute';

import Login from '../components/Login';
import RegisterProfile from '../components/RegisterProfile';
import Product from '../components/Product';
import Order from '../components/Order';
import SettingProduct from '../components/SettingProduct';
import EditProfile from '../components/EditProfile'

import GlobalStyle from '../styles/global';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <ProtectLogoutRoute path="/" exact={true} component={Login} />
        <ProtectLogoutRoute path="/register"  exact={true} component={RegisterProfile} />
        <ProtectLoginRoute path="/product" exact={true} component={Product} />
        <ProtectLoginRoute path="/order" exact={true} component={Order} />
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
  (BaseComponent) => (props) => {
    const { isAuth, isFetch, checkAuth } = props;

    React.useEffect(() => {
      if(isNil(isAuth)){
        checkAuth();
      }},
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    if(isFetch) {
      return(
        <>
        </>
      )
    }

    return(
      <BaseComponent 
        {...props}
      />
    )
  },
)(App);

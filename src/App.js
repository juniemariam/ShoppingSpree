import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import logo from "./logo.svg";
import "./App.css";
import FeedProdList from "./components/feedProdList/FeedProdList.js";
import WishList from "./components/WishList/WishList";
import FeedSpecProd from "./components/feedProdList/FeedSpecProd/FeedSpecProd";
import Direction from "./components/Map/Direction";
import ProdView from "./components/ProdView/ProdView";
import Layout from "./hoc/Layout/Layout";
import Geo from "./components/Map/Geo";
import Directions from "./components/Map/Direction";
import Auth from "./containers/Auth/Auth";
import AddProd from "./components/AddProd/AddProd"
import ManProd from './components/ManProd/ManProd'
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import Push from 'push.js'


class App extends Component {
  componentDidMount() {
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
    });
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
    })
    this.props.onTryAutoSignup();
    //this is to push notification
    // Push.create("welcome to shoppingspree");
  }
  
  render() {
    const isCust = localStorage.getItem('isCust'); 
    //console.log("isCust: " + isCust)
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={FeedProdList} />
        <Route path="/geo" exact component={Geo} />
        <Route path="/FeedM" exact component={FeedSpecProd} />
        <Route path="/ProdView" exact component={ProdView} />
        <Route path="/MapView" exact component={Directions} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/wish" exact component={WishList} />
          <Route path="/FeedM" exact component={FeedSpecProd} />
          <Route path="/AddProd" component={AddProd} />
          <Route path="/ProdView" exact component={ProdView} />
          <Route path="/MapView" exact component={Directions} />
          <Route path="/" exact component={FeedProdList} />
          <Route path="/geo" exact component={Geo} />
          <Route path="/ManProd" exact component={ManProd} />
          <Route path="/direction" exact component={Directions} />
          <Redirect to="/" />
        </Switch>
      );
    }


    return (
      <div className="App">
        <Layout isCust={isCust}>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Layout>
//           <Route path="/" exact component={FeedProdList} />
//           <Route path="/geo" exact component={Geo} />
//           <Route path="/FeedM" exact component={FeedSpecProd} />
//         </Layout>
//       </div>
//     );
//   }
// }

// export default App;

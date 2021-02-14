import './App.scss';
import React, { Component } from 'react';
import {lazy, useState, Suspense, useEffect} from 'react';
import {Route, Redirect, Switch, useLocation} from 'react-router-dom';
import useDarkMode from 'use-dark-mode';
import Login from './user/login/Login';
import Signup from './user/signup/Signup';
import Profile from './user/profile/Profile';
import { Layout, notification } from 'antd';
import { getCurrentUser } from './utils/APIUtils';
import { ACCESS_TOKEN } from './constants';

const Home = lazy(() => import('./components/Home'));
const { Content } = Layout;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    


// this.darkMode = useDarkMode(false);
// const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
// const location = useLocation();

// const pages = [
//   {
//     pageLink: '/',
//     view: Home,
//     displayName: 'Home',
//     showInNavbar: true,
//   },
//   {
//     pageLink: '/blog',
//     view: Blog,
//     displayName: 'Blog',
//     showInNavbar: true,
//   },
//   {
//     pageLink: '/about',
//     view: About,
//     displayName: 'About',
//     showInNavbar: true,
//   },
//   {
//     pageLink: '/state/:stateCode',
//     view: State,
//     displayName: 'State',
//     showInNavbar: false,
//   },
// ];

// useEffect(() => {
//   if (showLanguageSwitcher) {
//     // For Chrome, Firefox, IE and Opera
//     document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
//     // For Safari
//     document.body.scrollTo({top: 0, behavior: 'smooth'});
//   }
// }, [showLanguageSwitcher]);


  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Polling App',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Polling App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }


  
  render (){
    
  return (
    <div className="App">
      <Switch> 
            <Route path="/" component={Home}></Route>
            <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/users/:username" render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}></Route>
        </Switch>
    </div>
  );
  }
};

export default App;

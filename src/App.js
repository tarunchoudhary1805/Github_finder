import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../src/Components/layout/Navbar";
import UserItem from "./Components/users/UserItem";
import Users from "./Components/users/Users";
import User from "./Components/users/User";
import axios from "axios";
import Search from "./Components/users/Search";
import { Alert } from "./Components/layout/Alert";
import About from '../src/Components/Pages/About'

class App extends Component {
  state = {
    users: [],
    user:{},
    loading: false,
    alert: null,
    repos:[],
  };
  // async componentDidMount() {

  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({loading:false,users:res.data});
  //   console.log(res.data);
  // }
  // search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    // console.log(text);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, users: res.data.items });
  };

  // get a single github user
  getUser = async (username) =>{
    this.setState({ loading: true });
    // console.log(text);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, user: res.data });

  }
  // get user repos
  getUserRepos = async (username) =>{
    this.setState({ loading: true });
    // console.log(text);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=1000&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, repos: res.data });

  }

  // clear user from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };
  // set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };
  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar title="Github_Finder" icon="fab fa-github" />

          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path = '/about' component={About} />
              <Route
               exact
               path = '/user/:login'
               render={props => ( <User {...props}  getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} loading={loading}
                repos={repos}
                 />
               )}
               />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

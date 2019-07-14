import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import PostFrom from './components/Post/PostFrom';
class App extends Component{
  render(){
    return(
		<BrowserRouter>
		  <div className="App">
			<Switch>
				<Route exact path="/" component={Login}/>
				<Route path='/home/' component={Home}/>
				<Route path='/signUp/' component={SignUp}/>
				<Route path='/AddPost/' component={PostFrom}/>
			</Switch>
		  </div>
		</BrowserRouter>
    );
  }
}
export default App;

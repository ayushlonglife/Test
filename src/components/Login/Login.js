import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData'

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			username:'',
			password:'',
			redirect:false
		}
		this.handleLogin=this.handleLogin.bind(this);
		this.onChangeFun=this.onChangeFun.bind(this);
		
	}
	handleLogin=(e)=>{
		e.preventDefault();
		if(this.state.username && this.state.password){
			PostData('product/login.php',this.state).then((result)=>{
				let responseData=result;
				if(responseData.data){
							
					sessionStorage.setItem('userData',responseData);
					this.setState({redirect:true});
					this.props.history.push('/home/');
				}else{
						
					console.log('Error');
				}
					
			})
		}
	}
	
	onChangeFun(e){
		this.setState({[e.target.name]:e.target.value})
	}
	
	handleSignUp(e){
		
		return (<Redirect to={'/signUp'}/>)
	}
	
  render(){
	 if(this.state.redirect || sessionStorage.getItem('userData')){
		return (<Redirect to={'/home'}/>)
	}
	  
    return (
		<div className="container">
			
			<form>
			<h2 className="center">Login Page</h2>
			<label>UserName</label>
			<input type="text" name="username" placeholder="UserName" onChange={this.onChangeFun}/><br/>
			<label>Password</label>
			<input type="password" name="password" placeholder="password" onChange={this.onChangeFun}/>
			<input type="submit" value="Login" className="btn" onClick={this.handleLogin}/>
			<a href={'/signUp'}>SignUp</a>
			</form>
		</div>
    );
  }
}
export default Login;

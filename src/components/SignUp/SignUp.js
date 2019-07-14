import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import '../../css/style.css';
class SignUp extends Component{
	
	constructor(props){
		super(props);
		this.state={
			fields:{},
			errors:{},
			selectedFile:''
		}
	}
	xu]fdsfdfdf
	
	
	
	handleOnChange=(e)=>{
		let fields=this.state.fields;
		if(e.target.name!='imagePic')
		fields[e.target.name]=e.target.value;
		this.setState({
			fields
		});
	}
	
	fileSelect = (e) => {
		this.setState({selectedFile: e.target.files[0]});
	}
	
	validationFun(){
		let fields=this.state.fields;
		let errors={};
		let formIsValid=true;
		if(!fields['first_name']){
			formIsValid=false;
			errors['first_name']='Please enter first name!.';
		}
		if(!fields['last_name']){
			formIsValid=false;
			errors['last_name']='Please enter last name!.';
		}
		if(!fields['email']){
			formIsValid=false;
			errors['email']='Please enter email!.';
		}
		if(!fields['username']){
			formIsValid=false;
			errors['username']='Please enter username!.';
		}
		if(!fields['password']){
			formIsValid=false;
			errors['password']='Please enter Password!.';
		}
		this.setState({
			errors:errors
		});
		
		return formIsValid;
	}
	handleImageSubmit(){
		console.log('hii');
		const fd = new FormData();
		fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
		fetch("http://localhost/api/product/saveimage.php",{
			method: 'POST',
			body: fd
		}).then((response) => response.json())
			.then((responseData) => {
				this.props.history.push('/');
		}).catch((error) => {
					
			alert('Server Error');
		});
	}
	handleSignUp=(e)=>{
		e.preventDefault();
		if(this.validationFun()){
			PostData('product/add_user.php',this.state.fields).then((result)=>{
				console.log(result);
				if(result.status==1){
					
					let id=result.id;
					const fd = new FormData();
					fd.append('image', this.state.selectedFile);
					fd.append('userId', id);
				
					
					fetch("http://localhost/api/product/saveimage.php",{
						method: 'POST',
						body: fd
					}).then((response) => response.json())
					.then((responseJson) => {
						
						if(responseJson.status==1){
							alert("User Created Successfully!.");
							this.props.history.push('/');
					
						}else{
							alert("Server Error!.");
							//this.props.history.push('/');
						}
									  
					}).catch((error) => {
						alert("Server Error!.");
					});
				}else{
					
					alert("Server Error!.");
				}
			})
			
		}
	}
	
  render(){
    return(
		<div className="container">
			<h1>SignUp</h1>
			<form onSubmit={this.handleSignUp}>
				<label>First Name:</label>
				<input type="text" name="first_name" placeholder="First Name" onChange={this.handleOnChange} value={this.state.fields.first_name}/>
				<div className="errorMsg">{this.state.errors.first_name}</div>
				<label>Last Name:</label>
				<input type="text" name="last_name" placeholder="Last Name" onChange={this.handleOnChange}/>
				<div className="errorMsg">{this.state.errors.last_name}</div>
				<label>Email:</label>
				<input type="text" name="email" placeholder="Email" onChange={this.handleOnChange}/>
				<div className="errorMsg">{this.state.errors.email}</div>
				<label>UserName:</label>
				<input type="text" name="username" placeholder="UserName" onChange={this.handleOnChange}/>
				<div className="errorMsg">{this.state.errors.username}</div>
				<label>Password:</label>
				<input type="password" name="password" placeholder="Password" onChange={this.handleOnChange}/>
				<div className="errorMsg">{this.state.errors.password}</div>
				<label>Select Image:</label>
				<input type="file" name="imagePic" onChange = {this.fileSelect} accept="image/*"  />
				<input type="submit" name="submit" className="btn" value="Register"/>
			</form>
		</div>
    );
  }
}
export default SignUp;

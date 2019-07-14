import React, { Component } from 'react';
import {connect} from 'react-redux';

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body =  e.target.message.value;
    const data = {
      id: new Date(),
      title,
      body
    }
	this.props.dispatch({
		
		type:'ADD_POST',
      data
	});
	
	
	
	this.props.history.push('/home');
    
  }
	render() {
		return (
			<div>
			  <h1>Create Post</h1>
			  <form onSubmit={this.handleSubmit}>
			   <input required type="text" name="title" placeholder="Enter Post Title"/>
			   <br /><br />
			   <textarea required rows="5" name="message" cols="28" placeholder="Enter Post" />
			   <br /><br />
			   <button>Post</button>
			  </form>
			</div>
		);
	}
}
export default connect()(PostForm);
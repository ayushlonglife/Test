import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			redirect:false
		}
		this.logout=this.logout.bind(this);
	}
	
	logout(){
		
		sessionStorage.setItem('userData','');
		sessionStorage.clear();
		this.setState({redirect:true});
		this.props.history.push('/');
		
		
	}
	
	handleClick=(id)=>{
		
		this.props.deletePost(id);
		console.log(id);
		//this.props.history.push('/');
	}
  render(){
	if(this.state.redirect || !sessionStorage.getItem('userData')){
		return (<Redirect to={'/'}/>)
	}
	
	const {posts}=this.props;
		const postList=posts.length?(posts.map((post)=>{
			
			return(
				<div className="post card" key={post.id}>
					<div className="card-content">
						<Link to={'/'+post.id}>
							<span className="card-title" >{post.title}</span>
						</Link>
						
						<p>{post.body}</p>
						<button className="btn grey" onClick={() => this.handleClick(post.id)}>Delete Post</button>
					</div>
				</div>
			)
		
		})):(<div className="center">No Posts yet</div>);
    return(
	
		
		
		 <div className="container">
		<Link className="btn right" to={'/AddPost'}>Add Post</Link>
		 <button className="btn right" onClick={this.logout}>Logout</button>
		  <h1>HomePage</h1>
		  {postList}
		  </div>
    );
  }
}

const mapStateToProps=(state)=>{
	return{
		posts:state.posts
	}
}
const matchPostDelete=(dispatch)=>{
	return{
		deletePost:(id)=>{dispatch({type:'DELETE_POST',id:id})}
	}
	
}


export default connect(mapStateToProps,matchPostDelete)(Home);

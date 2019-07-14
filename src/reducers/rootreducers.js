const initState={
	posts:[
	]
}
const rootReducer=(state=initState,action)=>{
	
	switch(action.type){
		case 'ADD_POST':
		 let newPost2=[...state.posts,action.data];
		 return {posts:newPost2};
		 
		 case 'DELETE_POST':
			let newPosts=state.posts.filter(post=>{
				return action.id!=post.id
			});
		
		return {posts:newPosts}
		 
		 default:
		 return state
	}
}
export default rootReducer;
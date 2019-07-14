export function PostData(type,userData){
	console.log(userData);
	let BaseUrl="http://localhost/api/";
	return new Promise((resolve,reject)=>{
		fetch(BaseUrl+type, {  
				method: 'POST',
				headers : { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(userData)
		}).then((response) => response.json())
			.then((responseData) => {
				resolve(responseData);
					
		}).catch((error) => {
					
			reject(error);
		});
		
	});
	
}
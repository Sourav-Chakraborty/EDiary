import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import "./signin.css"
export default function Signin(props) {
    const [login, setlogin] = useState({email:"",password:""})
	let history=useHistory()
	const setalert=props.setalert
    const onsubmitform=async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
              
            },
      
            body: JSON.stringify({email:login.email,password:login.password}), 
          });
          const json=await response.json()
          console.log(json)
		  if(json.success==="true"){  
			  localStorage.setItem("token",json.authToken)
		  	  history.push("/")
				setalert({type:"success",msg:"Congrats sign in sucessful"})
				setTimeout(() => {
				setalert({type:null,msg:""})
				  
				}, 4000);
		  }
		  else{  
			setalert({type:"danger",msg:"sign in failed"})
			setTimeout(() => {
			setalert({type:null,msg:""})
			  
			}, 4000);
		  }

          
    }
    const onChange = (e)=>{
        setlogin({...login, [e.target.name]: e.target.value})
      
    }
  return (
    <div >
     <div className="container-fluid">
		<div className="row main-content bg-success text-center">
			<div className="col-md-4 text-center company__info">
				<span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
				<h4 className="company_title">Your Company Logo</h4>
			</div>
			<div className="col-md-8 col-xs-12 col-sm-12 login_form " id="signin">
				<div className="container-fluid">
					<div className="row">
						<h2>Log In</h2>
					</div>
					<div className="row">
						<form onSubmit={onsubmitform}>
							<div className="row">
								<input type="email" name="email" id="email" className="form__input" placeholder="email" onChange={onChange}/>
							</div>
							<div className="row">
								
								<input type="password" name="password" id="password" className="form__input" placeholder="Password" onChange={onChange}/>
							</div>
						
							<div className="row">
								<button type="submit"   className="btn1">Submit</button>
							</div>
						</form>
					</div>
					<div className="row">
						<p>Don't have an account? <a href="#">Register Here</a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
	
    </div>
  );
}

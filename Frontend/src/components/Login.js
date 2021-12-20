import React,{useState,useContext,useEffect} from "react";
import {useNavigate,Navigate} from "react-router-dom"
import { UserContext } from "../UserContext";

 function Login()
   {   
       const {CurrentUser,setCurrentUser}=useContext(UserContext);
      
    const navigate=useNavigate();
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [Error,setError]=useState("")
    
    useEffect(()=>
    {
        setCurrentUser({});
    },[])
    const handleChange = (e) => {
     
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    
    };
  
   
  const handleResponse=(data)=>{ 
     
      setCurrentUser({email:data.email,name:data.name,age:data.age,phone:data.phone,gender:data.gender});
     navigate('/about');
   
 };
    const  handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
      
        fetch("/signin", {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type': 'application/json'
            },
        }) .then((res) => {
            if(!res.ok)
            {
                setError("Invalid Credentials");
                
            }
            return res.json()
        })
        .then(data => {
          {  
            if(!Error)
             handleResponse(data);
            
          }
        })
        
      
    setFormValues(initialValues);
        
        
      };
        return (
            <form>

                <h3>Log in </h3>
                {{Error} ? (
                <div style={{color:"red"}}>
                {Error}
                </div>):null
                }
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={formValues.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={formValues.password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={handleSubmit} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
               
            </form>
        );
    }
export default Login;

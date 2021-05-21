import React, { Component, useState, useContext} from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Axios from 'axios';
import ErrorNotice from "./misc/ErrorNotice";
import UserContext from "../../context/userContext";

function SignupPage() {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       name: '', 
    //       surname: '',
    //       phone: '', 
    //       email: '', 
    //       password:'', 
    //       re_password:''
    //     };
    //   }

    
        const [name, setUserName] = useState('');
        const [surname, setUserSurName] = useState('');
        const [phone, setUserPhone] = useState('');
        const [email, setUserEmail] = useState('');
        const [password, setUserPassword] = useState('');
        const [repassword, setUserRePassword] = useState('');
        const [error, setError] = useState();


        const { setUserData } = useContext(UserContext);
        const history = useHistory();

        const submit = async(e) => {
            e.preventDefault();

        // const addUser =()=> {
        //     const newUser = {name: userName, surname: userSurname,phone:userPhone, email:userEmail, password:userPassword, repassword: userRePassword};
        //     Axios.post("http://localhost:5000/usersAuth/signup", newUser);
        
        // }

        try {
            // const newUser = {name: name, surname: surname,phone:phone, email:email, password: password, repassword: repassword};
            console.log(name);
            await Axios.post("http://localhost:5000/usersAuth/signup", {name: name, surname: surname,phone:phone, email:email, password: password, repassword: repassword});
            const loginRes = await Axios.post("http://localhost:5000/usersAuth/login", {
              email,
              password,
            });
            setUserData({
              token: loginRes.data.token,
              user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/user-profile");
          } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
          }
        };
        let publicUrl = process.env.PUBLIC_URL+'/'

        return ( <div className = "container my-4 mt-5"> 
        {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
         )}
                        <form onSubmit={submit}>
			                    <div className="col offset-md-3">
                                <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Name</span>
			                          <input type="text" name="name" onChange={
                                          (event)=> {
                                             setUserName(event.target.value);
                                          }
                                      }/>
			                        </label>
			                      </div>
                                  <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Surname</span>
			                          <input type="text" name="surname" onChange={
                                          (event)=> {
                                            setUserSurName(event.target.value);
                                          }
                                      }/>
			                        </label>
			                      </div>
                                  <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Phone</span>
			                          <input type="text" name="phone" onChange={
                                          (event)=> {
                                            setUserPhone(event.target.value);
                                          }
                                      }/>
			                        </label>
			                      </div>
			                      <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Email</span>
			                          <input type="email" name="email" onChange={
                                          (event)=> {
                                            setUserEmail(event.target.value);
                                          }
                                      }/>
			                        </label>
			                      </div>
			                      <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Password</span>
			                          <input type="password" name="password" onChange={
                                          (event)=> {
                                            setUserPassword(event.target.value);
                                          }
                                      } />
			                        </label>
			                      </div>
                                  <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Re-Password</span>
			                          <input type="password" name="repassword" onChange={
                                          (event)=> {      
                                                setUserRePassword(event.target.value);
                                          }
                                      }/>
			                        </label>
			                      </div>

			                      <div className="col-sm-2 offset-md-2">

			                        <input className="btn btn-yellow btn-lg btn-block"  type="submit" value="Sign up" />
			                      </div>
			                    </div>
			                  </form>
                              <div className="col my-4 mt-20 offset-md-5">
                              <p className="font-weight-light">Already have an account, pls <Link to="/login">Login</Link>!</p>
                              </div>    
                        </div>

        )
}

export default SignupPage;
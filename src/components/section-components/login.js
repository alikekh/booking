import React, { Component, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import ErrorNotice from "./misc/ErrorNotice";
import UserContext from "../../context/userContext";


function LoginPage(){

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState();
	const { setUserData } = useContext(UserContext);

	const history = useHistory();


        let publicUrl = process.env.PUBLIC_URL+'/'


		const submit = async(e) => {
			e.preventDefault();
			try {
			  const loginUser = { email, password };
			  const loginRes = await Axios.post(
				"http://localhost:5000/usersAuth/login",
				loginUser
			  );
			  setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			  });
			  localStorage.setItem("auth-token", loginRes.data.token);
			  history.push("/");

			} catch (err) {
			  err.response.data.msg && setError(err.response.data.msg);
			}
		  };


        return (<div className = "container my-4 mt-5"> 
		      {error && (
						<ErrorNotice message={error} clearError={() => setError(undefined)} />
					)}
        					<form onSubmit={submit}>
			                    <div className="col offset-md-3">
			                      <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Email</span>
			                          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
			                        </label>
			                      </div>
			                      <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Password</span>
			                          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
			                        </label>
			                      </div>
			                      

			                      <div className="col-sm-2 offset-md-2">

			                        <input className="btn btn-yellow btn-lg btn-block" value="Login" type="submit"/>
			                      </div>
			                    </div>
			                  </form>
                              <div className="col my-4 mt-20 offset-md-5">
                              <p className="font-weight-light">No account yet, pls <Link to="/signup">Sign up</Link> to us!</p>
                              </div>    
</div>
		)
}


export default LoginPage;
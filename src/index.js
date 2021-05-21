import React, { Component, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import HomeV3 from './components/home-v3';
import AboutUs from './components/about';

import TourDetails from './components/tour-details';


import Axios from "axios";
import Contact from './components/contact';

import UserProfile from './components/user-profile';
import Paymentss from './components/section-components/payments';
import Success from './components/section-components/successpage';
import MyBooking from './components/section-components/mybooking';
import CancelPage from './components/section-components/cancelpage';
import Login from './components/login';
import Signup from './components/signup';

import UserContext from "./context/userContext";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

function Root() {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	  });
	
	  useEffect(() => {
		const checkLoggedIn = async () => {
		  let token = localStorage.getItem("auth-token");
		  if (token === null) {
			localStorage.setItem("auth-token", "");
			token = "";
		  }
		  const tokenRes = await Axios.post(
			"http://localhost:5000/usersAuth/tokenIsValid",
			null,
			{ headers: { "x-auth-token": token } }
		  );
		  if (tokenRes.data) {
			const userRes = await Axios.get("http://localhost:5000/usersAuth/", {
			  headers: { "x-auth-token": token },
			});
			setUserData({
			  token,
			  user: userRes.data,
			});
		  }
		};
	
		checkLoggedIn();
	  }, []);

        return(
			<Provider
			store={createStore(
				reducers,
				{
				  auth: {
					isAuthenticated: userData.token ? true : false,
					token: userData.token,
				  },
				},
				applyMiddleware(reduxThunk)
			  )}>
			<BrowserRouter>
			<UserContext.Provider value={{ userData, setUserData }}>
                <HashRouter basename="/" >
	                <div>
	                <Switch>
	                    <Route exact path="/" component={HomeV3} />
	                    <Route path="/about" component={AboutUs} />
	                    <Route path="/book" component={TourDetails} />
	                    <Route path="/contact" component={Contact} />
	                    <Route path="/user-profile" component={UserProfile} />
						<Route path="/payments" component={Paymentss} />
						<Route path="/successpage" component={Success} />
						<Route path="/mybookings" component={MyBooking} />
						<Route path="/cancelpage" component={CancelPage} />					
						<Route path="/login" exact strict component={Login} />
						<Route path="/signup" exact strict component={Signup} />
	                </Switch>
	                </div>
                </HashRouter>
				</UserContext.Provider>
				</BrowserRouter>
				</Provider>
        )
    }


export default Root;

ReactDOM.render(<Root />, document.getElementById('viaje'));

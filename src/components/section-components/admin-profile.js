import React, { Component, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import UserContext from '../../context/userContext'
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
// import tableIcons from "@material-ui/icons/Search";


const api = axios.create({
    baseURL: `http://localhost:5000/transport`,
  });
function AdminProfile() {


    var columns = [
        {
            title: "Type",
            field: "transport_type",
          },
        {
          title: "Company",
          field: "company",
        },
        { title: "Name", field: "name" },
    
        {
          title: "Source",
          field: "from",
        },
        {
          title: "Destination",
          field: "to",
        },
        { title: "Date", field: "date", type: "date" },
    
        { title: "Fare", field: "fare", type: "numeric" },
        // {
        //   title: "Birth Place",
        //   field: "birthCity",
        //   lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
        // },
      ];

	const { userData , setUserData} = useContext(UserContext);
    const [data, setData] = useState([]);
	const u = userData.user;
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api
          .get("/")
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          })
          .catch((error) => {
            console.log("Error");
          });
      }, []);

	const logout = () => {
		setUserData({
		  token: undefined,
		  user: undefined,
		});
		localStorage.setItem("auth-token", "");
	  };


      const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = [];
        if (newData.transport_type === "") {
            errorList.push("Please enter transport type");
          }
        if (newData.company === "") {
          errorList.push("Please enter airlines company name");
        }
        if (newData.name === "") {
          errorList.push("Please enter flight name");
        }
        if (newData.from === "") {
          errorList.push("Please enter source");
        }
        if (newData.to === "") {
          errorList.push("Please enter destination");
        }
        if (newData.date === "") {
          errorList.push("Please enter date");
        }
        if (newData.fare === "") {
          errorList.push("Please enter fare");
        }
    
        if (errorList.length < 1) {
          api
            .patch("/" + newData._id, newData)
            .then((res) => {
              const dataUpdate = [...data];
              const index = oldData.tableData._id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve();
              setIserror(false);
              setErrorMessages([]);
            })
            .catch((error) => {
              setErrorMessages(["Update failed! Server error"]);
              setIserror(true);
              resolve();
            });
        } else {
          setErrorMessages(errorList);
          setIserror(true);
          resolve();
        }
      };
    
      const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = [];
        if (newData.company === "") {
          errorList.push("Please enter company name");
        }
        if (newData.name === "") {
          errorList.push("Please enter flight name");
        }
        if (newData.from === "") {
          errorList.push("Please enter source");
        }
        if (newData.to === "") {
          errorList.push("Please enter destination");
        }
        if (newData.date === "") {
          errorList.push("Please enter date");
        }
        if (newData.fare === "") {
          errorList.push("Please enter fare");
        }
    
        if (errorList.length < 1) {
          //no error
          api
            .post("/", newData)
            .then((res) => {
              let dataToAdd = [...data];
              dataToAdd.push(newData);
              setData(dataToAdd);
              resolve();
              setErrorMessages([]);
              setIserror(false);
            })
            .catch((error) => {
              setErrorMessages(["Cannot add data. Server error!"]);
              setIserror(true);
              resolve();
            });
        } else {
          setErrorMessages(errorList);
          setIserror(true);
          resolve();
        }
      };
    
      const handleRowDelete = (oldData, resolve) => {
        console.log(oldData);
        api
          .delete("/" + oldData._id)
          .then((res) => {
            const dataDelete = [...data];
            const index = oldData.tableData._id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            resolve();
          })
          .catch((error) => {
            setErrorMessages(["Delete failed! Server error"]);
            setIserror(true);
            resolve();
          });
      };

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  (<div className="user-profile-area pd-top-120">
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
			  <div className="container">
			    <div className="row">
			      <div className="col-xl-10 col-lg-12">
			        <div className="row">
			          <div className="col-lg-4">
			            <ul className="nav nav-tabs tp-tabs style-two">
			              <li className="nav-item">
			                <a className="nav-link active" data-toggle="tab" href="#tabs_1"><i className="fa fa-user" />Profile</a>
			              </li>
			              <li className="nav-item">
			                <a className="nav-link" data-toggle="tab" href="#tabs_2"><i className="fa fa-check-square-o" />Verifications</a>
			              </li>
			              <li className="nav-item">
			                <a className="nav-link" data-toggle="tab" href="#tabs_3"><i className="fa fa-cog" />Settings</a>
			              </li>
			              <li className="nav-item">
			                <a className="nav-link" data-toggle="tab" href="#tabs_4"><i className="fa fa-recycle" />Manage Transfer</a>
			              </li>
			              <li className="nav-item">
			                <a className="nav-link" data-toggle="tab" href="#tabs_5"><i className="fa fa-credit-card-alt" />Payment Methods</a>
			              </li>
			              <li className="nav-item">
			                <a className="nav-link" data-toggle="tab" href="#tabs_6"><i className="fa fa-star-o" />Reviews</a>
			              </li>
			              <li className="text-center">
			                <a className="btn btn-yellow" href="#" onClick={logout}><i className="fa fa-sign-in" aria-hidden="true" /> <span>Log Out</span></a>
			              </li>
			            </ul>
			          </div>
			          <div className="col-xl-7 col-lg-8 offset-xl-1">
			            <div className="tab-content user-tab-content">
			              <div className="tab-pane fade show active" id="tabs_1">
			                <div className="user-details">
			                  <h3 className="user-details-title">Profile</h3>
			                  <div className="tp-img-upload">
			                    <div className="tp-avatar-preview">
			                      <div id="tp_imagePreview">
								  <img src="https://picsum.photos/id/1/387/412" alt="team" />
			                      </div>
			                    </div>
			                    <div className="tp-avatar-edit">
			                      <input type="file" id="tp_imageUpload" accept=".png, .jpg, .jpeg" />
			                      <label className="btn btn-transparent" htmlFor="tp_imageUpload"><i className="fa fa-picture-o" />Change Photo</label>
			                     {userData.user ? (<h4 className="name">{u.name+" "+u.surname}</h4>) :(
									 <h4 className="name"></h4>
								 ) }
			                    </div>
			                  </div>
			                  <form className="tp-form-wrap">
			                    <div className="row">
			                      <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">First Name</span>
									  {userData.user ? (<input type="text" name="first-name" value={u.name}/>) :(
									 <input type="text" name="first-name" />
								 ) }

			                        </label>
			                      </div>
			                      <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Last Number</span>
									  {userData.user ? (<input type="text" name="last-name" value={u.surname}/>) :(
									 <input type="text" name="last-name" />
								 ) }

			                        </label>
			                      </div>
			                      <div className="col-lg-12">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Tell us about yourself.</span>
			                          <textarea defaultValue={""} name="message" />
			                        </label>
			                      </div>
			                      <div className="col-md-7">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Country</span>
			                          <input type="text"  name="country"/>
			                        </label>
			                      </div>
			                      <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Email Address</span>
									  {userData.user ? (<input type="text" name="email" value={u.email}/>) :(
									 <input type="text" name="email" />
								 ) }

			                        </label>
			                      </div>
			                      <div className="col-md-6">
			                        <label className="single-input-wrap style-two">
			                          <span className="single-input-title">Other Phone</span>
									  {userData.user ? (<input type="text" name="phone" value={u.phone}/>) :(
									  <input type="text" placeholder={+77} name="phone"/>
								 ) }

			                        </label>
			                      </div>
			                      <div className="col-12">
			                        <input className="btn btn-yellow mt-3 text-center" type="submit" />
			                      </div>
			                    </div>
			                  </form>
			                </div>
			              </div>
			              <div className="tab-pane fade" id="tabs_2">
			                <div className="user-verification">
			                  <div className="row">
			                    <div className="col-lg-7">
			                      <h3 className="user-details-title">Verification</h3>

								  {userData.user ? (
									  <>
								<div className="notice"><i className="fa fa-check" /> Your email have been verified.</div>  
								  <span>{u.email}</span>
								  </>
								  ) :(
									  <>
									<div className="notice"><i className="fa fa-exclamation-triangle" /> Your email has't been verified.</div>
									<span>email@gmail.com</span>
									</>
								 ) }

			                    </div>
			                  </div>
			                </div>
			              </div>
			              <div className="tab-pane fade" id="tabs_3">
			                <div className="user-settings">
			                  <h3 className="user-details-title">Settings</h3>
			                  <div className="row">
			                    <div className="col-lg-7">
			                      <label className="single-input-wrap style-two">
			                        <span className="single-input-title mb-3">Change your password</span>
			                        <input type="text" placeholder="Old password" />
			                      </label>
			                    </div>
			                    <div className="col-lg-7">
			                      <label className="single-input-wrap style-two">
			                        <input type="text" placeholder="New password" />
			                      </label>
			                    </div>
			                    <div className="col-lg-7">
			                      <label className="single-input-wrap style-two">
			                        <input type="text" placeholder="New password" />
			                      </label>
			                    </div>
			                  </div>
			                </div>
			              </div>
			              <div className="tab-pane fade" id="tabs_4">
			                <div className="user-recent-view">
			                  <h3 className="user-details-title">Manage</h3>
                              <div className="App">
                                    <Grid container spacing={1}>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={0}>
                                        <div>
                                            {iserror && (
                                            <Alert severity="error">
                                                {errorMessages.map((msg, i) => {
                                                return <div key={i}>{msg}</div>;
                                                })}
                                            </Alert>
                                            )}
                                        </div>
                                        <MaterialTable
                                            title="Manage transfers"
                                            columns={columns}
                                            data={data}
                                            // icons={tableIcons}
                                            editable={{
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve) => {
                                                handleRowUpdate(newData, oldData, resolve);
                                                }),
                                            onRowAdd: (newData) =>
                                                new Promise((resolve) => {
                                                handleRowAdd(newData, resolve);
                                                }),
                                            onRowDelete: (oldData) =>
                                                new Promise((resolve) => {
                                                handleRowDelete(oldData, resolve);
                                                }),
                                            }}
                                        />
                                        </Grid>
                                        <Grid item xs={3}></Grid>
                                    </Grid>
                                    </div>
			                </div>
                          </div>
			              <div className="tab-pane fade" id="tabs_5">
			                <div className="user-payment-method">
			                  <div className="location-review-area">
			                    <h3 className="user-details-title">Payment Methods</h3>
			                    <form className="tp-form-wrap bg-gray tp-form-wrap-one">
			                      <div className="row">
			                        <div className="col-lg-7">
			                          <label className="single-input-wrap">
			                            <span className="single-input-title">Credit card number</span>
			                            <input type="text" />
			                          </label>
			                          <label className="single-input-wrap">
			                            <span className="single-input-title">Card holder name</span>
			                            <input type="text" />
			                          </label>
			                          <label className="single-input-wrap">
			                            <span className="single-input-title">Expiry date (Example: 01/17)</span>
			                            <input type="text" />
			                          </label>
			                          <label className="single-input-wrap">
			                            <span className="single-input-title">Issuing bank</span>
			                            <input type="text" />
			                          </label>
			                        </div>
			                        <div className="col-lg-5">
			                          <div className="user-payment-card">
			                            <img src={publicUrl+"assets/img/others/16.png"} alt="img" />
			                            <span>Available payment method:</span>
			                            <div className="payment-card">
			                              <i className="fa fa-cc-paypal" />
			                              <i className="fa fa-cc-visa" />
			                              <i className="fa fa-cc-mastercard" />
			                              <i className="fa fa-credit-card-alt" />
			                            </div>
			                            <a className="btn btn-transparent" href="#">Cancel</a>
			                            <a className="btn btn-yellow" href="#">Save</a>
			                          </div>
			                        </div>
			                      </div>
			                    </form>
			                  </div>
			                </div>
			              </div>
			              <div className="tab-pane fade" id="tabs_6">
			                <div className="user-tour-details">
			                  <h3 className="user-details-title">Reviews</h3>
			                  <span className="user-tour-details-title">Reviews About You</span>
			                  <span>| Reviews By You</span>
			                  <div className="comments-area tour-details-review-area">
			                    <ul className="comment-list mb-0">
			                      <li>
			                        <div className="single-comment-wrap">
			                          <div className="thumb">
			                            <img src={publicUrl+"assets/img/client/2.png"} alt="img" />
			                          </div>
			                          <div className="content">
			                            <h4 className="title">Tyler Bailey</h4>
			                            <span className="date">13 August 2019</span>
			                            <div className="tp-review-meta">
			                              <i className="ic-yellow fa fa-star" />
			                              <i className="ic-yellow fa fa-star" />
			                              <i className="ic-yellow fa fa-star" />
			                              <i className="ic-yellow fa fa-star" />
			                              <i className="ic-yellow fa fa-star" />
			                            </div>
			                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
			                          </div>
			                        </div>
			                      </li>
			                    </ul>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div> 
			    </div>
			  </div>
			</div>


	 ) }

export default AdminProfile
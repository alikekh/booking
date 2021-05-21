import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Button, Alert, Card, Modal, Breadcrumb, Table } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";

import axios from 'axios';
import * as actions from "../actions";
import CustomInput from "../global-components/CustomInput";
import Context from '../../context/userContext'

import { withRouter } from 'react-router'
// const { userData , setUserData} = useContext(UserContext);
// const u = userData.user;
class TourDetails extends Component {

  static contextType = Context;

  constructor(props) {
    super(props);
    this.loadPassengers();
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.confirmFlight = this.confirmFlight.bind(this);

    this.state = { showForm: false, show: false, userDetails: {}};
    // console.log(this.props.user.userDetails);
  }

  onClick() {
    this.setState({ showForm: true });
  }

  async bookFlight(userDetails) {
    console.log(userDetails._id);
    await this.setState({ userDetails });
    this.props.storeUserDetails(userDetails);
    this.handleShow();
  }
  async confirmFlight() {
    // console.log(this.state.userDetails._id);
    // await this.props.bookFlight(
    //   this.state.userDetails._id,
    //   this.props.flight._id
    // );
    // this.props.history.push("/successpage");
    this.props.history.push("/payments");
  }


  async parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const userid = JSON.parse(window.atob(base64));
    return userid;
}
  async loadPassengers() {
    const token = localStorage.getItem('auth-token');
    const user =(await this.parseJwt(token) );
    console.log(user.id);
    await this.props.fetchUserDetails(user.id);
 
    if (user.id!==0) {
      // const u = await this.props.fetchUserDetails()
      // await this.props.fetchUserDetails(user.id);
      // console.log(this.props.userDetails, "eto lenth");
      if (this.props.userDetails.length === 0) {
        this.setState({ showForm: true });
      }
    }
  }

  async HomeSearch(){
    this.props.history.push("/");
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  async onSubmit(formData) {
    const token = localStorage.getItem('auth-token');
    const user =(await this.parseJwt(token) );
    const res = await this.props.validateUserDetails(formData);
    if (res) {
      await this.props.addUserDetails(user.id, formData);
      this.loadPassengers();
      this.state.showForm = false;
    }
  }

    render() {


        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'
        const { handleSubmit } = this.props;

    return  (
      <div className="row">
        <div className="col" style={{marginRight:"50px", marginTop:"50px", marginLeft:"50px", marginBottom:"50px"}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Search Trip</Link>
            {/* {console.log(this.props.user, "sdfsdfsdfsdf")} */}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Traveller Details</Breadcrumb.Item>
        </Breadcrumb>
        {this.state.userDetails.hasOwnProperty("_id") ? (
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Review Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card style={{ marginBottom: "2rem" }}>
                <Card.Header>Trip Details</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {this.props.flight.company} {this.props.flight.name}
                  </Card.Title>
                  <Card.Text>
                    From : {this.props.flight.from} To : {this.props.flight.to}
                    <br />
                    Fare : &#36;{this.props.flight.fare} <br />
                    Date : {this.props.flight.date.substring(0, 10)}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ marginBottom: "2rem" }}>
                <Card.Header>Traveller Details</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {this.state.userDetails.firstName}{" "}
                    {this.state.userDetails.lastName}{" "}
                  </Card.Title>
                  <Card.Text>
                    Birthdate:{" "}
                    {this.state.userDetails.birthdate.substring(0, 10)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>

              <Button variant="primary" onClick={this.confirmFlight}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
        <h1>Book Trip</h1>
        {this.props.flight.hasOwnProperty("_id") ? (
          <>
            <Card style={{ marginBottom: "2rem" }}>
              <Card.Header>{this.props.flight.name}</Card.Header>
              <Card.Body>
                <Card.Title>{this.props.flight.company}</Card.Title>
                <Card.Text>
                  <table style={{ width: "100%", tableLayout: "fixed" }}>
                    <tbody>
                      <tr>
                        <td style={{ fontSize: "1.8rem" }}>
                          {this.props.flight.from}
                        </td>
                        <td>
                          <span class="plane">
                            <svg
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              height="50"
                              width="50"
                              image-rendering="optimizeQuality"
                              shape-rendering="geometricPrecision"
                              text-rendering="geometricPrecision"
                              viewBox="0 0 500 500"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g stroke="#222">
                                <line
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-width="30"
                                  x1="300"
                                  x2="55"
                                  y1="390"
                                  y2="390"
                                />
                                <path
                                  d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z"
                                  fill="#222"
                                  stroke-linejoin="round"
                                  stroke-width="10"
                                />
                              </g>
                            </svg>
                          </span>
                        </td>
                        <td style={{ fontSize: "1.8rem" }}>
                          {this.props.flight.to}
                        </td>
                        <td style={{ fontSize: "1.8rem" }}>
                          {/* <span style={{ float: "right" }}> */}
                          &#36;{this.props.flight.fare}
                          {/* </span> */}
                        </td>
                        <td style={{ fontSize: "1.8rem" }}>
                          {this.props.flight.date.substring(0, 10)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Text>
              </Card.Body>
            </Card>
            <h4>Book trip for</h4>
            {/* <DropdownButton id="dropdown-basic-button" title="Select passenger">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton> */}
            {console.log(this.props.userDetails +" Eto details")}
            {this.props.userDetails.length > 0 ? (
              //   <>
              //     <input type="text" list="data" onChange={this._onChange} />
              //     <datalist id="data">
              //       {this.props.userDetails.map((item, key) => (
              //         <option key={item._id} value={item.firstName} />
              //       ))}
              //     </datalist>
              //   </>
              <>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Birthdate</th>
                      <th>Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.userDetails.map((user, key) => (
                      <tr key={user._id}>
                        <td>{user.firstName + " " + user.lastName}</td>
                        <td>{user.birthdate.substring(0, 10)}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => this.bookFlight(user)}
                          >
                            Book
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="primary" onClick={this.onClick}>
                  Add Other Traveller
                </Button>
              </>
            ) : null}
            {this.state.showForm ? (
              <Card>
                <Card.Body>
                  <form onSubmit={handleSubmit(this.onSubmit)}>
                    <fieldset>
                      <Field
                        name="firstName"
                        type="text"
                        id="firstName"
                        label="First Name"
                        placeholder="First Name"
                        required
                        component={CustomInput}
                      ></Field>
                    </fieldset>

                    <fieldset>
                      <Field
                        name="lastName"
                        type="text"
                        id="lastName"
                        label="Last Name"
                        placeholder="Last Name"
                        required
                        component={CustomInput}
                      ></Field>
                    </fieldset>
                    <fieldset>
                      <Field
                        name="birthdate"
                        type="date"
                        id="birthdate"
                        label="Birthdate"
                        placeholder="Birthdate"
                        required
                        component={CustomInput}
                      ></Field>
                    </fieldset>
                    {this.props.errorMessage ? (
                      <Alert variant="danger">{this.props.errorMessage} </Alert>
                    ) : null}
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            ) : null}
          </>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>You have not selected any trip to book</Card.Text>

                <Link to="/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button variant="primary">Search Trip</Button>
                  
                </Link>

            </Card.Body>
          </Card>
        )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.errorMessage,
    flight: state.flight.flight,
    user: state.auth.user,
    userDetails: state.user.userDetails,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "addPassenger" })
)(withRouter(TourDetails));	
//     <div className="tour-details-area mg-top--70">
//               <div className="tour-details-gallery">
//                 <div className="container-bg bg-dark-blue">
//                   <div className="container">
//                     <div className="gallery-filter-area row">
//                       <div className="gallery-sizer col-1" />
//                       {/* gallery-item */}
//                       <div className="tp-gallery-item col-md-5 col-sm-6 mb-10">
//                         <div className="tp-gallery-item-img">
//                           <div className="thumbnails">
//                             <img src={publicUrl+"assets/img/tour-details/1.png"} alt="image" />
//                             <div className="video-popup-btn">
//                               <a href="https://www.youtube.com/watch?v=c7XEhXZ_rsk" className="video-play-btn mfp-iframe" tabIndex={0}><i className="fa fa-play" /></a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       {/* gallery-item */}
//                       <div className="tp-gallery-item col-md-3 col-sm-6">
//                         <div className="tp-gallery-item-img">
//                           <a href="#" data-effect="mfp-zoom-in">
//                             <img src={publicUrl+"assets/img/tour-details/2.png"} alt="image" />
//                           </a>
//                         </div>
//                       </div>
//                       {/* gallery-item */}
//                       <div className="tp-gallery-item col-lg-2 col-md-4 col-sm-6">
//                         <div className="tp-gallery-item-img">
//                           <a href="#" data-effect="mfp-zoom-in">
//                             <img src={publicUrl+"assets/img/tour-details/3.png"} alt="image" />
//                           </a>
//                         </div>
//                       </div>
//                       {/* gallery-item */}
//                       <div className="tp-gallery-item col-lg-2 col-md-4 col-sm-6">
//                         <div className="tp-gallery-item-img">
//                           <a href="#" data-effect="mfp-zoom-in">
//                             <img src={publicUrl+"assets/img/tour-details/4.png"} alt="image" />
//                           </a>
//                         </div>
//                       </div>
//                       {/* gallery-item */}
//                       <div className="tp-gallery-item col-lg-2 col-md-4 col-sm-6">
//                         <div className="tp-gallery-item-img">
//                           <a href="#" data-effect="mfp-zoom-in">
//                             <img src={publicUrl+"assets/img/tour-details/5.png"} alt="image" />
//                           </a>
//                         </div>
//                       </div>
//                       {/* gallery-item */}
//                       <div className="tp-gallery-item col-lg-2 col-md-4 col-sm-6">
//                         <div className="tp-gallery-item-img">
//                           <a href="#" data-effect="mfp-zoom-in">
//                             <img src={publicUrl+"assets/img/tour-details/6.png"} alt="image" />
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-xl-3 col-lg-4">
//                         <div className="details">
//                           <p className="location mb-0"><i className="fa fa-map-marker" />Canada</p>
//                           <h4 className="title">Bali Province</h4>
//                           <p className="content">3 days 2 person</p>
//                           <div className="tp-review-meta">
//                             <i className="ic-yellow fa fa-star" />
//                             <i className="ic-yellow fa fa-star" />
//                             <i className="ic-yellow fa fa-star" />
//                             <i className="ic-yellow fa fa-star" />
//                             <i className="fa fa-star" />
//                             <span>4.0</span>
//                           </div>
//                           <div className="all-tags">
//                             <a href="#">Adventures</a>
//                             <a href="#">Local special ties</a>
//                             <a href="#">Natural</a>
//                             <a href="#">Travel</a>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-xl-9 col-lg-8">
//                         <div className="book-list-warp">
//                           <p className="book-list-content">Just booked! Get your spot before it's too late.</p>
//                           <div className="tp-price-meta">
//                             <p>Price</p>
//                             <h2>775 <small>$</small></h2>
//                           </div>
//                         </div>
//                         <ul className="tp-list-meta border-tp-solid">
//                           <li className="ml-0"><i className="fa fa-calendar-o" /> 8 Oct</li>
//                           <li><i className="fa fa-clock-o" /> 4 Days</li>
//                           <li><i className="fa fa-users" />2 Person</li>
//                           <li><i className="fa fa-snowflake-o" /> Relaxing</li>
//                           <li><i className="fa fa-star" /> 4.3</li>
//                         </ul>
//                       </div>   
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="container">
//                 <div className="row">
//                   <div className="col-lg-8">
//                     <div className="tour-details-wrap">
//                       <h4 className="single-page-small-title">Write A Review</h4>
//                       <p>From its distinct half-hour time zone to its occasional June snowshower, Newfoundland runs on its own time. By August, the summer crowds have dwindled, berries hang ripe and heavy on their stems, and the landscape is ablaze with wildflowers. Join us at the peak of Newfoundland’s late summer season as we wind our way through the famously Celtic stretch of coastline known as the Irish Loop, exploring its unique history, folklore, cuisine, and breathtaking seaside scenery. We’ll enjoy dinners made from freshly foraged ingredients on a quiet dock, chat with a boat-builder in the midst of making a vessel, and learn how to craft heritage cheese from local experts while surrounded by an adorable, bleating tribe of tiny baby goats. As we make our way along the Loop, we’ll encounter countless characters, places, and stories that give this corner of the island its charm, tenacity, and unique flair.</p>
//                       <p> This trip is offered by Atlas Obscura. Once you've reserved your spot, our team will be in touch to help you prepare for the trip. Please note that flights to and from St. John's are not included in the trip cost. This trip is limited by 12 travelers.</p>
//                       <div className="package-included-area">
//                         <h4 className="single-page-small-title">Included</h4>
//                         <div className="row">
//                           <div className="col-xl-4 col-sm-6">
//                             <div className="single-package-included">
//                               <img src={publicUrl+"assets/img/icons/15.png"} alt="icons" />
//                               <h6>Food</h6>
//                               <p>3 breakfasts, 3 dinners</p>
//                             </div>
//                           </div>
//                           <div className="col-xl-4 col-sm-6">
//                             <div className="single-package-included">
//                               <img src={publicUrl+"assets/img/icons/16.png"} alt="icons" />
//                               <h6>Accommodations</h6>
//                               <p>3 nights in a hotel</p>
//                             </div>
//                           </div>
//                           <div className="col-xl-4 col-sm-6">
//                             <div className="single-package-included">
//                               <img src={publicUrl+"assets/img/icons/17.png"} alt="icons" />
//                               <h6>Transportation</h6>
//                               <p>2 boat rides, 1 car ride</p>
//                             </div>
//                           </div>
//                           <div className="col-xl-4 col-sm-6">
//                             <div className="single-package-included">
//                               <img src={publicUrl+"assets/img/icons/18.png"} alt="icons" />
//                               <h6>Drinks</h6>
//                               <p>Water, tea, coffee, beer</p>
//                             </div>
//                           </div>
//                           <div className="col-xl-4 col-sm-6">
//                             <div className="single-package-included">
//                               <img src={publicUrl+"assets/img/icons/19.png"} alt="icons" />
//                               <h6>Tickets</h6>
//                               <p>Entrance fee</p>
//                             </div>
//                           </div>
//                           <div className="col-xl-4 col-sm-6">
//                             <div className="single-package-included">
//                               <img src={publicUrl+"assets/img/icons/20.png"} alt="icons" />
//                               <h6>Equipment</h6>
//                               <p>Outdoor gear, safety</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="package-included-location">
//                         <h4 className="single-page-small-title">Your Itinerary</h4>
//                         <div className="row">
//                           <div className="col-lg-4 col-md-4">
//                             <div className="single-blog">
//                               <div className="p-list">
//                                 <div className="list">1</div>
//                                 <p>Day 1</p>
//                               </div>
//                               <div className="thumb">
//                                 <img src={publicUrl+"assets/img/blog/8.png"} alt="blog" />
//                               </div>
//                               <div className="single-blog-details">
//                                 <h4 className="title">Welcome to St. John's</h4>
//                                 <p className="content">After a welcome drink, we'll stroll into town and get to know each other over a hyper-local “nose-to-tail” dinner. Show more</p>
//                                 <a className="btn-read-more" href="#"><span>Show More<i className="la la-arrow-right" /></span></a>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-md-4">
//                             <div className="single-blog">
//                               <div className="p-list">
//                                 <div className="list">2</div>
//                                 <p>Day 2</p>
//                               </div>
//                               <div className="thumb">
//                                 <img src={publicUrl+"assets/img/blog/1.png"} alt="blog" />
//                               </div>
//                               <div className="single-blog-details">
//                                 <h4 className="title">Relaxation &amp; Exploration</h4>
//                                 <p className="content">After a welcome drink, we'll stroll into town and get to know each other over a hyper-local “nose-to-tail” dinner. Show more</p>
//                                 <a className="btn-read-more" href="#"><span>Show More<i className="la la-arrow-right" /></span></a>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-md-4">
//                             <div className="single-blog single-blog-after-none">
//                               <div className="p-list">
//                                 <div className="list">3</div>
//                                 <p>Day 3</p>
//                               </div>
//                               <div className="thumb">
//                                 <img src={publicUrl+"assets/img/blog/9.png"} alt="blog" />
//                               </div>
//                               <div className="single-blog-details">
//                                 <h4 className="title">Farewell &amp; Departure</h4>
//                                 <p className="content">After a welcome drink, we'll stroll into town and get to know each other over a hyper-local “nose-to-tail” dinner. Show more</p>
//                                 <a className="btn-read-more" href="#"><span>Show More<i className="la la-arrow-right" /></span></a>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="host-area">
//                         <div className="single-host-wrap text-center">
//                           <div className="thumb">
//                             <img src={publicUrl+"assets/img/client/02.png"} alt="img" />
//                           </div>
//                           <h4>Mike At Atlas Obscura Trips</h4>
//                           <p>I'm your Atlas Obscura Trip Coordinator. Since 2016, Atlas Obscura has been offering unusual trips to the world’s most extraordinary places. Our itineraries are developed in close collaboration with the locals and insiders who host them—our global community of explorers</p>
//                           <p> Felicity Roberts will be leading your trip. A rural Newfoundlander, certified herbalist, farmer, writer, wild food advocate, and self relic, Felicity is most on the barrens cutting heather to dye wool or hanging off the edge</p>
//                           <a className="btn btn-yellow" href="#">Contact Host</a>
//                         </div>
//                       </div>
//                       <div className="service-location-map">
//                         <h4 className="single-page-small-title">Service Location</h4>
//                         <div className="service-location-map">
//                           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d649788.5753409272!2d-0.5724199684037448!3d52.92186340524542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d94c3b82ab%3A0x62077a554c8e9a8e!2sPetty%20France%2C%20Westminster%2C%20London%2C%20UK!5e0!3m2!1sen!2sbd!4v1572346566908!5m2!1sen!2sbd" />
//                         </div>
//                       </div>
//                       <div className="comments-area tour-details-review-area">
//                         <h4 className="comments-title">Reviews</h4>
//                         <ul className="comment-list mb-0">
//                           <li>
//                             <div className="single-comment-wrap">
//                               <div className="thumb">
//                                 <img src="assets/img/client/2.png" alt="img" />
//                               </div>
//                               <div className="content">
//                                 <h4 className="title">Tyler Bailey</h4>
//                                 <span className="date">13 August 2019</span>
//                                 <div className="tp-review-meta">
//                                   <i className="ic-yellow fa fa-star" />
//                                   <i className="ic-yellow fa fa-star" />
//                                   <i className="ic-yellow fa fa-star" />
//                                   <i className="ic-yellow fa fa-star" />
//                                   <i className="ic-yellow fa fa-star" />
//                                 </div>
//                                 <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
//                               </div>
//                             </div>
//                           </li>
//                           <li>
//                             <div className="single-comment-wrap">
//                               <div className="thumb">
//                                 <img src="assets/img/client/3.png" alt="img" />
//                               </div>
//                               <div className="content">
//                                 <h4 className="title">Eliza Jordan</h4>
//                                 <span className="date">17 SEP 2019</span>
//                                 <div className="tp-review-meta">
//                                   <i className="ic-yellow fa fa-star" />
//                                   <i className="ic-yellow fa fa-star" />
//                                   <i className="ic-yellow fa fa-star" />
//                                   <i className="ic-yellow fa fa-star" />
//                                   <i className="ic-yellow fa fa-star" />
//                                 </div>
//                                 <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
//                               </div>
//                             </div>
//                           </li>
//                         </ul>
//                         <div className="btn-wrapper text-right mt-3">
//                           <a className="btn-read-more" href="#"><span>More Review<i className="la la-arrow-right" /></span></a>
//                         </div>
//                       </div>
//                       <div className="location-review-area">
//                         <form className="tp-form-wrap bg-gray tp-form-wrap-one">
//                           <div className="row">
//                             <div className="col-lg-6"><h4 className="single-page-small-title">Write A Review</h4></div>
//                             <div className="col-lg-6">
//                               <div className="tp-review-meta text-lg-right">
//                                 <span className="mr-3 ml-0">Assigned Rating</span>
//                                 <i className="fa fa-star" />
//                                 <i className="fa fa-star" />
//                                 <i className="fa fa-star" />
//                                 <i className="fa fa-star" />
//                                 <i className="fa fa-star" />
//                               </div>
//                             </div>
//                             <div className="col-lg-6">
//                               <label className="single-input-wrap">
//                                 <span className="single-input-title">Name</span>
//                                 <input type="text" />
//                               </label>
//                             </div>
//                             <div className="col-lg-6">
//                               <label className="single-input-wrap">
//                                 <span className="single-input-title">Email</span>
//                                 <input type="text" />
//                               </label>
//                             </div>
//                             <div className="col-lg-12">
//                               <label className="single-input-wrap">
//                                 <span className="single-input-title">Comments</span>
//                                 <textarea defaultValue={""} />
//                               </label>
//                             </div>
//                             <div className="col-12">
//                               <a className="btn btn-yellow" href="#">Send</a>
//                             </div>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-4">
//                     <div className="sidebar-area sidebar-area-4">
//                       <div className="widget tour-list-widget">
//                         <div className="widget-tour-list-meta">
//                           <div className="single-widget-search-input-title"><i className="fa fa-user" /> Name</div>
//                           <div className="single-widget-search-input">
//                             <input type="text" placeholder="Name" />
//                           </div>
//                           <div className="single-widget-search-input-title"><i className="fa fa-envelope" /> Email</div>
//                           <div className="single-widget-search-input">
//                             <input type="text" placeholder="Email" />
//                           </div>
//                           <div className="single-widget-search-input-title"><i className="fa fa-phone" /> Phone</div>
//                           <div className="single-widget-search-input">
//                             <input type="text" placeholder="Phone" />
//                           </div>
//                           <div className="single-widget-search-input-title"><i className="fa fa-calendar-minus-o" /> Date</div>
//                           <div className="single-widget-search-input">
//                             <input type="text" className="departing-date custom-select" placeholder="Departing" />
//                           </div>
//                           <div className="single-widget-search-input-title"><i className="fa fa-calendar-minus-o" /> Date</div>
//                           <div className="single-widget-search-input">
//                             <input type="text" className="returning-date custom-select" placeholder="Returning" />
//                           </div>
//                           <div className="single-widget-search-input-title"><i className="fa fa-keyboard-o" /> Message</div>
//                           <div className="single-widget-search-input">
//                             <textarea placeholder="Type" defaultValue={""} />
//                           </div>
//                           <div className="text-lg-center text-left">
//                             <a className="btn btn-yellow" href="#">Book Now <i className="fa fa-paper-plane" /></a>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="widget_ads">
//                         <a href="#"><img className="w-100" src={publicUrl+"assets/img/others/01.png" }alt="img" /></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//         }
// }

// export default TourDetails
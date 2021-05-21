import React from "react";
import { connect } from "react-redux";
import { Button, Jumbotron, Modal, Breadcrumb, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { withRouter } from 'react-router'
import { bookFlight, clearBooking } from "../actions";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Payments({ flight, user, userDetails, bookFlight, clearBooking }) {
  const fare = flight.fare;
  let history = useHistory();

  const api = axios.create({
    baseURL: `http://localhost:5000/bookings`,
  });


  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    console.log(fare);
    const data = await api.post("/razorpay", { fare });
    //   .then((t) => t.json());

    console.log(data.data.amount);

    const options = {
      key: "rzp_test_FJyneSt14uvKYp",
      currency: data.data.currency,
      amount: data.data.amount.toString(),
      order_id: data.data.id,
      name: "Trip Booking",
      description: "Complete payment to book the trip",
      //   image: "http://localhost:1337/logo.svg",
      handler: async function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log(userDetails._id);
        await clearBooking();
        await bookFlight(userDetails, flight);
        history.push("/successpage");
      },
      "prefill": {
        "email": "user@user.com",
        "contact": "8888888888"
   }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div className="row">
        <div className="col" style={{marginRight:"50px", marginTop:"50px", marginLeft:"50px", marginBottom:"50px"}}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Search Trip</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/book">Traveller Details</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Payment</Breadcrumb.Item>
      </Breadcrumb>
      <Jumbotron>
        <h4>Pay {fare}</h4>
        <p>
          <Button onClick={displayRazorpay} variant="primary">
            Pay now
          </Button>
        </p>
      </Jumbotron>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    flight: state.flight.flight,
    user: state.auth.user,
    userDetails: state.flight.userDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bookFlight: (userDetails, flight) =>
      dispatch(bookFlight(userDetails, flight)),
    clearBooking: () => dispatch(clearBooking()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payments));
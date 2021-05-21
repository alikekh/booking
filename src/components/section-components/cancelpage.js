import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CancelPages extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.cancelBooking);
  }
  render() {
    return (
      <>
        {this.props.cancelBooking ? (
          <Jumbotron>
            <h1>Booking cancelled!</h1>
            <p>Your payment will be refunded soon</p>
            <p>
                <Link
                  to="/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                    <Button variant="primary">Book new trip</Button>
                </Link>{" "}
            </p>
          </Jumbotron>
        ) : (
          <Jumbotron>
            <h1>Booking cancellation failed!</h1>
            <p>Please try again</p>
            <p>

                <Link
                  to="/user-profile"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                <Button variant="primary">
                  View all bookings</Button>
                </Link>{" "}
            </p>
          </Jumbotron>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    cancelBooking: state.flight.cancelBooking,
  };
}

export default connect(mapStateToProps)(CancelPages);
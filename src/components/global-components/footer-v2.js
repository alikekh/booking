import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer_v2 extends Component {

    componentDidMount() {
        let publicUrl = process.env.PUBLIC_URL+'/'
        const minscript = document.createElement("script");
        minscript.async = true;
        minscript.src = publicUrl + "assets/js/main.js";

        document.body.appendChild(minscript);
    }

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imgattr = "Footer logo"

        return (
  				<footer className="footer-area style-two">
				  <div className="container">
				    <div className="row justify-content-center">
				      <div className="col-xl-5 col-lg-7">
				        <div className="section-title mb-4 text-center">
				          <h2 className="title">EASYWAY</h2>
				          <p>Sign up to receive the best offers</p>
				        </div>
				        <div className="widget input-group newslatter-wrap">
				          <div className="input-group-prepend">
				            <span className="input-group-text"><i className="fa fa-envelope" /></span>
				          </div>
				          <input type="text" name="email" className="form-control" placeholder="Email" />
				          <div className="input-group-append">
				            <button className="btn btn-yellow" type="button">Subscribe</button>
				          </div>
				        </div>
				        <div className="about_us_widget text-center">
				          <Link to="/" className="footer-logo"> 
				            <img src={publicUrl+"assets/img/log.png"} alt="footerlogo" />
				          </Link>
				          <p>Cras gravida bibendum dolor eu varius. Morbi fermentum velit nisl, eget vehicula lorem sodales eget. Donec quis volutpat orci.</p>
				        </div>
				      </div>  
				    </div>
				    <div className="row justify-content-center">
				      <div className="col-xl-7">
				        <div className="footer-widget widget text-center">
				          <div className="widget-contact d-inline-flex">
				            <p className="telephone text-left">
				              <i className="fa fa-phone base-color" /> 
				              <span>
				                +777777777777
				              </span>
				            </p>
				            <p className="location text-left"> 
				              <i className="fa fa-envelope-o" />
				              <span>easyway@gmail.com</span>
				            </p>
				            <p className="text-left">
				              <i className="fa fa-map-marker" /> 
				              <span>Almaty, Kazakhstan</span>
				            </p>
				          </div>
				        </div>
				        <div className="footer-widget widget text-center">
				          <ul className="widget_nav_menu text-center viaje-go-top">
				            <li><Link to="/">Home</Link></li>
				            <li><Link to="/about">About Us</Link></li>
				            <li><Link to="/destination-list">Destination</Link></li>
				            <li><Link to="/tour-details">Tours</Link></li>
				            <li><Link to="/contact">Contact</Link></li>
				          </ul>
				        </div>
				      </div> 
				    </div>
				  </div>
				
				</footer>

        )
    }
}


export default Footer_v2
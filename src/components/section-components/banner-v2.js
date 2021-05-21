import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class BannerV2 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

    return  <div className="main-banner-area jarallax" style={{backgroundImage: 'url('+publicUrl+'assets/img/banner/4.png)'}}>
			  <div className="content">
			    <div className="container">
			      <h2>Plan your travel</h2>
				  <h2>Where are you going?</h2>
			      <h1>EASYWAY</h1>
			      <h1 className="shadow">EASYWAY</h1>
			      <div className="scroll-down">
			        <a href="#main_search" className="text-center">
			          <span />
			          <i className="la la-long-arrow-down" />
			        </a>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default BannerV2
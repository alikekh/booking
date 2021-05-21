import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Contact extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

    return	<div>
              <div className="contact-area pd-top-108">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <div className="section-title text-lg-center text-left">
                        <h2 className="title">Get In Touch!</h2>
                        <p>Vestibulum blandit viverra convallis. Pellentesque ligula urna, fermentum ut semper in, tincidunt nec dui. Morbi mauris lacus, consequat eget justo in</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-5 offset-xl-1 col-lg-6">
                      <div className="thumb">
                        <img src="https://picsum.photos/id/1022/614/449" alt="img" />
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                      <form className="tp-form-wrap">
                        <div className="row">
                          <div className="col-md-6">
                            <label className="single-input-wrap style-two">
                              <span className="single-input-title">Name</span>
                              <input type="text" name="name" />
                            </label>
                          </div>
                          <div className="col-md-6">
                            <label className="single-input-wrap style-two">
                              <span className="single-input-title">Number</span>
                              <input type="text" name="number"/>
                            </label>
                          </div>
                          <div className="col-lg-12">
                            <label className="single-input-wrap style-two">
                              <span className="single-input-title">Email</span>
                              <input type="text" name="email"/>
                            </label>
                          </div>
                          <div className="col-lg-12">
                            <label className="single-input-wrap style-two">
                              <span className="single-input-title">Message</span>
                              <textarea defaultValue={""} name="message" />
                            </label>
                          </div>
                          <div className="col-12">
                            <input type="submit" className="btn btn-yellow" value="Send Message" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-info-area pd-top-120">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 order-lg-12">
                      <iframe className="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.7764533415298!2d76.9075561154458!3d43.235146379137895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883692f027581ad%3A0x2426740f56437e63!2z0JzQtdC20LTRg9C90LDRgNC-0LTQvdGL0Lkg0YPQvdC40LLQtdGA0YHQuNGC0LXRgiDQuNC90YTQvtGA0LzQsNGG0LjQvtC90L3Ri9GFINGC0LXRhdC90L7Qu9C-0LPQuNC5!5e0!3m2!1sru!2skz!4v1621102724899!5m2!1sru!2skz" />
                    </div>
                    <div className="col-xl-3 col-lg-4 order-lg-1">
                      <div className="contact-info bg-gray">
                        <p>
                          <i className="fa fa-map-marker" /> 
                          <span>street Manasa, university IITU  Almaty, KZ</span>
                        </p>
                        <p>
                          <i className="fa fa-clock-o" /> 
                          <span>University hours 8:00 - 18.00</span>
                        </p>
                        <p>
                          <i className="fa fa-envelope" /> 
                          <span>Email: <span>iitu@iitu.kz</span></span>
                        </p>
                        <p>
                          <i className="fa fa-phone" /> 
                          <span>
                            sell phone: <span>+7 777 7777777</span> <br />
                            telephone: <span>+7 727 7777777</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        }
}

export default Contact
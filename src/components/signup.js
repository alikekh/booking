
import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import SignupPage from './section-components/signup';
import Footer from './global-components/footer';

const Signup = () => {
    return <div>
        <Navbar/>
        <PageHeader headertitle="Sign up"/>

        <SignupPage/>
        <Footer/>
    </div>

}

export default Signup;
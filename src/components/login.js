
import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import LoginPage from './section-components/login';
import Footer from './global-components/footer';

const Login = () => {
    return <div>
        <Navbar/>
        <PageHeader headertitle="Login"/>

        <LoginPage/>
        <Footer/>
    </div>

}

export default Login;
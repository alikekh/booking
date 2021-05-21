import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Intro from './section-components/intro-v3';
import About from './section-components/about';
import Team from './section-components/team';
import Footer from './global-components/footer';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="About Us"  />
        <Intro />
        <About />
        <Team />
        <Footer />
    </div>
}

export default AboutPage


import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import TourDetails from './section-components/tour-details';
import Footer from './global-components/footer';

const TourDetailsPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Tour Details"  />
        <TourDetails />
        <Footer />
    </div>
}

export default TourDetailsPage


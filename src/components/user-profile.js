import React, {useContext, useEffect, useState} from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import UserProfile from './section-components/user-profile';
import AdminProfile from './section-components/admin-profile';
import Subscribe from './section-components/subscribe';
import Footer from './global-components/footer';
import UserContext from '../context/userContext'
import axios from 'axios'


function UserProfilePage (){
    const { userData , setUserData} = useContext(UserContext);
    const u = userData.user;
    const [UserInfo, setUser] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/usersAuth/").then((response)=>
        {
            setUser(response.data)
        })
    });

    return (<div>
        <Navbar />
        
        { userData.user  ? (
            u.userType ==="admin" ?(
        <>

            <PageHeader headertitle="Admin Profile"  />
            <AdminProfile />
        </>
            ):(
                <>
                <PageHeader headertitle="User Profile"  />
                <UserProfile />
                </>
            )
        ):(
            <>
            <PageHeader headertitle=" Profile"  />
            </>
                                ) }


        <Subscribe />
        <Footer />
    </div>
    )



}


export default UserProfilePage


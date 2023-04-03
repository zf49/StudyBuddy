import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
export default function Home() {

    // const {user,isAuthenticated} = useAuth0()
    // const [loginEmail, setLoginEmail] = useState<any>('');
    // const navigate = useNavigate()

    // useEffect( () => {
    //    if(isAuthenticated && user){
    //        setLoginEmail(user.email)
    //        axios.get(`http://localhost:8080/users/email/${user.email}`)
    //     .then(response => {
    //       console.log(response.data.length);
    //       // handle response
    //       if(response.data.length===0){
    //           navigate('/signup')
    //       }
          
    //     })
    //    }

    // }, [user,isAuthenticated])


   



    return (
        <>
            Home
            {/* {a()} */}
            {/* {loginEmail} */}
            {/* {state!="Created" && navigate('/signup')} */}
        </>
    )
}

import React, { useEffect, useState } from 'react'
import {Navigate, useNavigate, useRoutes } from 'react-router'
import NotFound from '../view/404/NoteFound'
import Friends from '../view/Friends/Friends'
import Login from '../view/Login/Login_Auth0'

import Profile from '../view/Profile/Profile'
import Search from '../view/Search/Search'
import SandBox from '../view/SandBox'
import Home from '../view/Home/Home'
import SignUp from '../view/SignUp/SignUp'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'


export default function IndexRouter() {

    const {user,isAuthenticated} = useAuth0()
    const navigate = useNavigate()

    useEffect( () => {
       if(isAuthenticated && user){
           axios.get(`http://localhost:8080/users/email/${user.email}`)
        .then(response => {
          console.log(response.data.length);
          // handle response
          if(response.data.length===0){
              navigate('/signup')
          }
        })
       }

    }, [user,isAuthenticated])




    let element = useRoutes([
        {
            path:'/',
            element:localStorage.getItem('token')?<SandBox/>:<Navigate to='/login'></Navigate>,
            children:[
                {index:true, element: <Home/>}
                ,
                {
                    path:"home",
                    element:<Home/>
                },
                {
                    path:"profile",
                    element:<Profile/>
                },
                {
                    path:"friends",
                    element:<Friends/>
                },
                {
                    path:"search",
                    element:<Search/>
                },
                {
                    path:"signup",
                    element:<SignUp/>
                },
                {
                    path:'*',
                    element:<NotFound/>
                }
            ]
        },
        {
            path:'/login',
            element:<Login/>
        }
    ])




    return (
        <div>
            {element}
        </div>
    )
}

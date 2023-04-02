import React from 'react'
import {Navigate, useRoutes } from 'react-router'
import NotFound from '../view/404/NoteFound'
import Friends from '../view/Friends/Friends'
import Login from '../view/Login/Login_Auth0'

import Profile from '../view/Profile/Profile'
import Search from '../view/Search/Search'
import SandBox from '../view/SandBox'
import Home from '../view/Home/Home'
import SignUp from '../view/SignUp/SignUp'
import { useAuth0 } from "@auth0/auth0-react";



export default function IndexRouter() {


    const { user, isAuthenticated, isLoading } = useAuth0();

    let element = useRoutes([
        {
            path:'/',
            element:localStorage.getItem("token")?<SandBox/>:<Navigate to='/login'></Navigate>,
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

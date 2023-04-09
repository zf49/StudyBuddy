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
import { useDispatch } from "react-redux";
import { storeUser } from '../redux/reducer/userReducer'
// import { storeUser } from "../redux/reducer/facultySlice";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'



export default function IndexRouter() {
    const dispatch = useDispatch();
    const [userExists, setUserExists] = useState(false);
    const {user,isAuthenticated,isLoading} = useAuth0()
    const navigate = useNavigate()

    const userStore = useSelector((state: RootState) => state.storeUser);

    useEffect( () => {
       if(isAuthenticated && user){
           
           axios.get(`http://localhost:8080/users/authID/${user.sub}`)
        .then(response => {
          console.log(response.data.length);
          if(response.data.length==0){
            // setUserExists(false);
            dispatch(storeUser(false))
            navigate('/signup')
        }else{
            // setUserExists(true)
            dispatch(storeUser(true))

        }
        })
       }
    }, [user,isAuthenticated,userStore,dispatch])




    // let element = useRoutes([
    //     {
    //         path:'/',
    //         element:
    //         // localStorage.getItem('token')?<SandBox/>:<Navigate to="/login" />,
    //         isLoading ? <div>Loading...</div> : (
    //         isAuthenticated ? (
    //           <SandBox />
    //         ) : (
    //           <Navigate to="/login" />
    //         )
    //       ),
    //         children:[
    //             {index:true, element: <Home/>}
    //             ,
    //             {
    //                 path:"home",
    //                 element:<Home/>
    //             },
    //             {
    //                 path:"profile",
    //                 element:<Profile/>
    //             },
    //             {
    //                 path:"friends",
    //                 element:<Friends/>
    //             },
    //             {
    //                 path:"search",
    //                 element:<Search/>
    //             },
    //             {
    //                 path:"signup",
    //                 element:<SignUp/>
    //             },
    //             {
    //                 path:'*',
    //                 element:<NotFound/>
    //             }
    //         ]
    //     },
    //     {
    //         path:'/login',
    //         element:<Login/>
    //     }
    // ])


    const element = useRoutes([
        {
          path: '/',
          element: isLoading ? <div>Loading...</div> : (
            isAuthenticated ? (
              <SandBox />
            ) : (
              <Navigate to="/login" />
            )
          ),
          children: [
            { index: true, element: <Home /> },
            {
              path: 'home',
              element: userStore ? <Home /> : <Navigate to="/signup" />,
            },
            {
              path: 'profile',
              element: userStore ? <Profile /> : <Navigate to="/signup" />,
            },
            {
              path: 'friends',
              element: userStore ? <Friends /> : <Navigate to="/signup" />,
            },
            {
              path: 'search',
              element: userStore ? <Search /> : <Navigate to="/signup" />,
            },
            {
              path: 'signup',
              element: <SignUp/>,
            },
            {
              path: '*',
              element: <NotFound />,
            },
          ],
        },
        {
          path: '/login',
          element: <Login />,
        },
      ]);





    return (
        <>
          {console.log(userStore)}
            {element}
        </>
    )
}

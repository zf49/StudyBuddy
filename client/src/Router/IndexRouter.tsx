import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useRoutes } from 'react-router'
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
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import FriendDetail from '../view/Friends/FriendDetail'
import Loading from '../view/Loading/Loading'
import Fellower from '../view/Fellower/Fellower'



export default function IndexRouter() {
  const [userExists, setUserExists] = useState(false);
  const { user, isAuthenticated, isLoading} = useAuth0()
  const navigate = useNavigate()

  const userStore = useSelector((state: RootState) => state.storeUser);
  const { getAccessTokenSilently } = useAuth0()



  useEffect(() => {
    const fetchData = async () => {
      const abort = new AbortController();
      const signal = abort.signal;
  
      try {
        const userExistsFromStorage = sessionStorage.getItem('userExists');
        setUserExists(userExistsFromStorage === 'true');
  
        const token = await getAccessTokenSilently();
  
        if (isAuthenticated && user && token) {
          const response = await axios.get(`http://localhost:8080/users/authID/${user.sub}`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: signal
          });
  
          if (response.data.length === 0) {
            sessionStorage.setItem('userExists', 'false');
            setUserExists(false);
            navigate('/signup');
          } else {
            sessionStorage.setItem('userExists', 'true');
            setUserExists(true);
          }
        }
      } catch (error) {
        //err 
        console.error(error);
      }
    };
  
    fetchData();
  
    return () => {
      const abort = new AbortController();
      abort.abort();
    };
  }, [user, isAuthenticated]);
  

  const changeUserState = (state: boolean) => {
    setUserExists(state)
  }

  const element = useRoutes([
    {
      path: '/',
      element:
        isLoading ?<Loading/> : (
          isAuthenticated ? (
            <SandBox />
          ) : (
            <Navigate to="/login" />
          )
        ),
      children: [
        { index: true, element: <Home /> }
        ,
        {
          path: "home",
          element: userExists ? <Home /> : <Navigate to="/signup" />
        },
        {
          path: "profile",
          element: userExists ? <Profile /> : <Navigate to="/signup" />
        },
        {
          path: "Following",
          element: userExists ? <Friends /> : <Navigate to="/signup" />
        },
        {
          path: "follower",
          element: userExists ?<Fellower/> : <Navigate to="/signup" />
        },
        {
          path: "search",
          element: userExists ? <Search /> : <Navigate to="/signup" />
        },
        {
          path: "frienddetail",
          element: userExists ? <FriendDetail /> : <Navigate to="/signup" />
        },
        {
          path: "signup",
          element: userExists ? (
            <Navigate to="/home" />
          ) : (
            <SignUp changeUserState={changeUserState} />
          )
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/loading',
      element: <Loading />
    }
  ])

  return (
    <div>
      {element}
      <>{console.log(userStore)}</>
    </div>
  )
}



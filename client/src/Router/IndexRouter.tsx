import { useEffect, useState } from 'react'
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



export default function IndexRouter() {
  const dispatch = useDispatch();
  const [userExists, setUserExists] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  const userStore = useSelector((state: RootState) => state.storeUser);



  useEffect(() => {
    const abort = new AbortController()

    if (isAuthenticated && user) {
      axios.get(`http://localhost:8080/users/authID/${user.sub}`, {
        signal: abort.signal
      })
        .then(response => {
          if (response.data.length == 0) {
            setUserExists(false);
            navigate('/signup')
          } else {
            setUserExists(true);
          }
        })
    }
    return () => {
      abort.abort();
    }

  }, [user, isAuthenticated])


  const changeUserState = (state: boolean) => {
    setUserExists(state)
  }

  const element = useRoutes([
    {
      path: '/',
      element:
        isLoading ? <div>Loading...</div> : (
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
          path: "friends",
          element: userExists ? <Friends /> : <Navigate to="/signup" />
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
    }
  ])


  // const element = useRoutes([
  //     {
  //       path: '/',
  //       element: isLoading ? <div>Loading...</div> : (
  //         isAuthenticated ? (
  //           <SandBox />
  //         ) : (
  //           <Navigate to="/login" />
  //         )
  //       ),
  //       children: [
  //         { index: true, element: <Home /> },
  //         {
  //           path: 'home',
  //           element: userExists ? <Home /> : <Navigate to="/signup" />,
  //         },
  //         {
  //           path: 'profile',
  //           element: userExists ? <Profile /> : <Navigate to="/signup" />,
  //         },
  //         {
  //           path: 'friends',
  //           element: userExists ? <Friends /> : <Navigate to="/signup" />,
  //         },
  //         {
  //           path: 'search',
  //           element: userExists ? <Search /> : <Navigate to="/signup" />,
  //         },
  //         {
  //           path: 'signup',
  //           element: <SignUp changeUserState={changeUserState}/>,
  //         },
  //         {
  //           path: '*',
  //           element: <NotFound />,
  //         },
  //       ],
  //     },
  //     {
  //       path: '/login',
  //       element: <Login />,
  //     },
  //   ]);





  return (
    <div>
      {element}
      <>{console.log(userStore)}</>
    </div>
  )
}

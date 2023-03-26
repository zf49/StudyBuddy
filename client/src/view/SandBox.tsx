import React,{Fragment} from 'react'
import BottomBar from '../component/SandBox/BottomBar'
import TopBar from '../component/SandBox/TopBar'
import { Outlet } from 'react-router';


export default function SandBox() {




    return (

        <Fragment>
            <TopBar/>
            <Outlet/>
            <BottomBar/>  
        </Fragment>
        
                 
        
       
         
          
    )
}

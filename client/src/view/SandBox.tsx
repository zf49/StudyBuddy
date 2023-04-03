import React,{Fragment} from 'react'
import TopBar from '../component/SandBox/TopBar'
import { Outlet } from 'react-router';
import Content from '../component/SandBox/Content';
import Menu from '../component/SandBox/SideBar';
import SideBar from '../component/SandBox/SideBar';


export default function SandBox() {




    return (

        <Fragment>
            <TopBar/>
            <Content/>
            {/* <BottomBar/>   */}
        </Fragment>
        
                 
        
       
         
          
    )
}

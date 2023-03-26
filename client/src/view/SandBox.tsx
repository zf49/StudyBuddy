import React,{Fragment} from 'react'
import BottomBar from '../component/SandBox/BottomBar'
import TopBar from '../component/SandBox/TopBar'
import { Outlet } from 'react-router';
import Content from '../component/SandBox/Content';


export default function SandBox() {




    return (

        <Fragment>
            <TopBar/>
            <Content/>
            {/* <BottomBar/>   */}
        </Fragment>
        
                 
        
       
         
          
    )
}

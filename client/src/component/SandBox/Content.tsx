import React from 'react'
import { Outlet } from 'react-router'

export default function Content() {
    return (
        <div style={{marginTop:'4em'}}>
            <Outlet/>
        </div>
    )
}

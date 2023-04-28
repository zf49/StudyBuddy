import React from 'react'
import { Outlet } from 'react-router'

export default function Content() {
    return (
        <div >
            <Outlet/>
        </div>
    )
}

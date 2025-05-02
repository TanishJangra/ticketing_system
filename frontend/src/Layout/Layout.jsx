import React from 'react'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import Sidebar from '../components/Sidebar/Sidebar'

const Layout = () => {
  return (
    <div className='layoutContainer'>
        <Sidebar />
        <div className="layout-content">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout
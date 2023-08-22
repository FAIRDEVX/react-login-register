import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import MyLogin from './components/MyLogin.jsx'
import MyHome from './components/MyHome.jsx'
import MyRegister from './components/MyRegister.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyLogin />
  },
  {
    path: "/mylogin",
    element: <MyLogin />
  },
  {
    path: "/myregister",
    element: <MyRegister />
  },
  {
    path: "/myhome",
    element: <MyHome />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

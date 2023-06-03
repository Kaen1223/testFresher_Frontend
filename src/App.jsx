import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login';
import Contact from './pages/contact';
import ManageBox from './pages/bookDetail/ManageBox';
import HeaderHome from './component/Header';
import FooterHome from './component/Footer';
import HomePage from './component/Home/Home';
import Register from './pages/register';
import { fetchAccount } from "./service/api";
import { doLoginAction } from './redux/account/accountSlice';
import Loading from './component/Loading';
import Page404 from './component/404_Page/404Page';
import AdminPage from './pages/admin';
import ProtectedRoute from './component/ProtectedRouter/ProtectedRoute';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import HeaderAdmin from './pages/admin/HeaderAmin';
import ManageUser from './pages/admin/ManageUser/ManageUser';
import BookPage from './component/BookPage/BookPage';
import Order from './pages/order/Order';
import History from './pages/history/History';


const { Header, Content, Footer } = Layout;



const LayOutHomePage = () => {
  return (
    <div className='layout-app'>    
     <Layout style={{minHeight : '100vh'}}>
          <HeaderHome/>
          <Outlet/>
        <FooterHome/>
    </Layout>
   
    </div>
  )
}


const LayOutAdminPage = (props) => {
  const {dataUser} = props

  if (dataUser.user.role === 'ADMIN' ) {
    return (
      <div className='layout-adminApp'>   
          
        <HeaderAdmin>
           <Outlet/>
        </HeaderAdmin>
        
        <FooterHome/>
      </div>
    )
  }else {
    return (
      <Outlet/>
    )
  }
 
}


export default function App() {
  const dispatch = useDispatch()

  const getAccount = async () => {
    if(window.location.pathname === '/login' || window.location.pathname === '/register'  ) {
         return
    }
     let res = await fetchAccount()
     console.log('app',res)
     if(res && res.statusCode == 200)
   
        dispatch(doLoginAction({
          data :  res.data.user,
          password :  dataUser.password
        }))
  }

  const dataUser  = useSelector(state => state.account)

  useEffect(() => {
    getAccount()
  },[])

  const router = createBrowserRouter([
    {
      path: "",
      element:  <LayOutHomePage />,
      errorElement: <Page404/>,
      children: [
        { index: true, element: <HomePage/> },
        {
          path: "order",
          element: <Order />,
        },
        {
          path: "book/:slug",
          element: <BookPage/>,
        },
        {
          path: "history",
          element: <History/>,
        },
        
      ],
    },
    //<ProtectedRoute><AdminPage/></ProtectedRoute>
    {
      path: "/admin",
      element:  <LayOutAdminPage dataUser = {dataUser } />,
      errorElement:  <Page404/>,
      children: [
        { index: true, element: <ProtectedRoute dataUser = {dataUser}><AdminPage/></ProtectedRoute> },
        {
          path: "manage-user",
          element: <ManageUser />,
          errorElement:  <Page404/>,
        },
        {
          path: "manage-book",
          element: <ManageBox />,
        },
        {
          path: "manage-orders",
          element: <History />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return  (
     <>
   
     
     
        <RouterProvider router={router} /> 
  
       
     </>
  )
}

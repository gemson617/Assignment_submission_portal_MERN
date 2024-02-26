import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./student/Login";
import StudRegister from "./student/StudRegister";
import ViewAssignments from "./student/ViewAssignments";
import StudHome from "./student/StudHome";
import Header from "./student/Header";
import ViewSubmitted from "./student/ViewSubmitted";
// import EditProfile from "./student/EditProfile";


//admin
import AdminHome from "./admin/AdminHome";
import AddAssignment from "./admin/AddAssignment";
import EditAssignment from "./admin/EditAssignment";
import ViewAssignmentsAdmin from "./admin/ViewAssignments";
import AdminViewSubmitted from "./admin/AdminViewSubmitted";

import { Routes, Route, Switch, Link } from 'react-router-dom'

// Create a new component that encapsulates all the components you want to render together
export default function Main() {
  return (
    <div>
     <Header /> 

       <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/studentHome' element={<StudHome/>}/>
                <Route path='/ViewSubmitted' element={<ViewSubmitted/>}/>
                <Route path='/viewAssignments' element={<ViewAssignments/>}/> 
                <Route path='/editProfile' element={<StudRegister/>}/> 

                {/* Admin */}
                <Route path='/admin/ViewAssignments' element={<ViewAssignmentsAdmin/>}/> 
                <Route path='/admin' element={<AdminHome/>}/> 
                <Route path='/admin/ViewSubmitted' element={<AdminViewSubmitted/>}/> 
                <Route path='/admin/addAssignment' element={<AddAssignment/>}/> 
                <Route path='/admin/ViewAssignments/editAssignment/:id' element={<EditAssignment/>}/>
                 {/* <Route path='/studRegister' element={<StudRegister/>}/> */}

        </Routes> 
   {/* <StudHome /> */}
       {/* <Login /> */}
       {/* <ViewAssignments />
      <AddAssignment /> 
      <ViewAssignmentsAdmin />*/}
      {/* <StudRegister /> */}
    </div>
  );
}



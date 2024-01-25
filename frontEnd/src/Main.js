import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./auth/Login";
import StudRegister from "./student/StudRegister";
import ViewAssignments from "./student/ViewAssignments";
import StudHome from "./student/StudHome";

//admin
import AddAssignment from "./admin/AddAssignment";
import EditAssignment from "./admin/EditAssignment";
import ViewAssignmentsAdmin from "./admin/ViewAssignments";

import { Routes, Route, Switch, Link } from 'react-router-dom'

// Create a new component that encapsulates all the components you want to render together
export default function Main() {
  return (
    <div>
       <Routes>
           {/*  <Route path='/studentHome' element={<StudHome/>}/>
                <Route path='/' element={<Login/>}/>*/}
                <Route path='/viewAssignmentsAdmin' element={<ViewAssignmentsAdmin/>}/> 
                <Route path='/ViewAssignmentsAdmin/editAssignment/:id' element={<EditAssignment/>}/>
                {/*  <Route path='/studRegister' element={<StudRegister/>}/>*/}

        </Routes> 
      {/* <StudHome />
      <Login />*/}
      <ViewAssignments />
      {/* <AddAssignment />  */}
      {/* <ViewAssignmentsAdmin /> */}
      {/* <StudRegister /> */}
    </div>
  );
}



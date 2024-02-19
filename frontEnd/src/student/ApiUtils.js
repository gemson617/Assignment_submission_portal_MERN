// apiUtils.js

import axios from 'axios';
import { setTokenAlert } from './states/ErrorSlice';

export const handleApiError = async (error, navigate, dispatch) => {


    if (error.response && error.response.status === 401) {
        // alert('You are not logged-in! Please login again.');
        navigate('/');
        await dispatch(setTokenAlert('Please login to continue!'))

        const timeoutId = setTimeout(() => {
            dispatch(setTokenAlert())
          }, 3000);
            return () => clearTimeout(timeoutId);
            
    } else {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
};


//Student Home get assignments api
export const getAssignmentsApi = async (setAssignments, navigate, dispatch) => {

    const token = localStorage.getItem('token'); // Assuming token is stored in local storage

    try {

        const response = await axios.get(`http://localhost:5000/student/getAssignments`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data.data
        // setAssignments();
        setAssignments(data);

        if (response.data.success) {
            alert('Assignment Retrieved Succesfully!')
            window.location.reload()
        }
    } catch (error) {
        handleApiError(error, navigate, dispatch);
    }
};

//view Assignments page get assignments api(by current user id)
export const viewAssignmentsApi = async (setAssignments, navigate, dispatch) => {

    const token = localStorage.getItem('token'); // Assuming token is stored in local storage
           
        try {
          const response = await axios.get(`http://localhost:5000/student/getAssignments`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
          const data =  response.data.data
              // setAssignments();
              setAssignments(data);

              if(response.data.success){
        alert('Assignment Retrieved Succesfully!')
        window.location.reload()
      }
        } catch (error) {
            handleApiError(error, navigate, dispatch);
        }
    };





//get submitted assignments
export const getSubmittedAssignmentsApi = async (id, setAssignments, dispatch, navigate) => {
    try {
        const response = await axios.get(`http://localhost:5000/student/getSubmitted/${id}`);
        const data = response.data.data;
        setAssignments(data);
        if (response.data.success) {
            alert('Assignment Retrieved Successfully!');
            window.location.reload();
        }
    } catch (error) {
        handleApiError(error, dispatch, navigate);
    }
};


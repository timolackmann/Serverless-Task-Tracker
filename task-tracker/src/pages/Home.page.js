import { useContext, useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material'
import { UserContext } from '../contexts/user.context';
import 'react-data-grid/lib/styles.css';
import TaskData from './TaskGrid';

export default function Home() {
 const { logOutUser } = useContext(UserContext);

 // This function is called when the user clicks the "Logout" button.
 const logOut = async () => {
   try {
     // Calling the logOutUser function from the user context.
     const loggedOut = await logOutUser();
   } catch (error) {
     alert(error)
   }
 }

 return (
   <>
     <Button variant="contained" onClick={(logOut)}>Logout</Button>
     <h1 style={{'text-align': 'center'}}>Your Tasks</h1>
     <TaskData />
   </>
 )
}

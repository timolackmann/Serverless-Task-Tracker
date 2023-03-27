import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realm/constants";

// Creating a Realm App Instance
const app = new App(APP_ID);

// Creating a user context to manage and access all the user related functions
// across different components and pages.
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);

 // Function to login user into our Realm using their email & password
 const emailPasswordLogin = async (email, password) => {
   const credentials = Credentials.emailPassword(email, password);
   const authedUser = await app.logIn(credentials);
   setUser(authedUser);
   return authedUser;
 };

 // Function to signup user into our Realm using their email & password
 const emailPasswordSignup = async (email, password) => {
   try {
     await app.emailPasswordAuth.registerUser({email, password});
     // Since we are automatically confirming our users we are going to login
     // the user using the same credentials once the signup is complete.
     return emailPasswordLogin(email, password);
   } catch (error) {
     throw error;
   }
 };

 // Using this function, you don’t need to login the user again and again. You can use this function to check if the user is already logged in.
 const fetchUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.refreshCustomData();
     // Now if we have a user we are setting it to our user context
     // so that we can use it in our app across different components.
     setUser(app.currentUser);
     return app.currentUser;
   } catch (error) {
     throw error;
   }
 }

 // Function to logout user from our Realm
 const logOutUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.logOut();
     // Setting the user to null once loggedOut.
     setUser(null);
     return true;
   } catch (error) {
     throw error
   }
 }

 //call Atlas App Service Function to create a new task
 const createToDo = async(summary,details, shared) => {
    const result = await user.callFunction("createTask",summary,details, shared);
    return result;
 }

 //call Atlas App Service Function to retrieve all tasks
 const getToDos = async () => {
    const result = await user.callFunction("getTasks");
    return result;
 }

 //update a given Task via Atlas App Service Function
 const updateTask = async (id, field, value) => {
    const result = await user.callFunction("updateTask", id, field, value);
    return result;
 }

 return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser, createToDo, getToDos, updateTask}}>
   {children}
 </UserContext.Provider>;
}

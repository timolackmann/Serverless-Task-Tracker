# MongoDB Atlas Serverless-Task-Tracker

This is a demo application using MongoDB Atlas App Services as a backend and React JS as front-end.
The application is a task tracker, which allows users to register, create new task and share them with other users.

# Getting Started

## Prerequisites

You will need the following prerequisits to run the automated deployment

- [MongoDB Atlas Account](https://cloud.mongodb.com/) (Free account available, no credit card needed)
- [Realm CLI](https://www.mongodb.com/docs/atlas/app-services/cli/)
- [NodeJS](https://nodejs.org/)

## Instructions

1. Clone this repository
2. Create & select an Atlas Project
3. Create an API key with the privilege `Project Owner` following [this steps](https://www.mongodb.com/docs/atlas/app-services/cli/#authentication).<br>Note down the public and private keys to use later
4. Create an Atlas Cluster<br>For the tutorial we prefer a serverless cluster but you can also use a dedicated or shared cluster
5. Run the command `./create-AppService.sh`
   - Provide the public & private API key and the name of the cluster you created
   - Enter `y` to confirm creation of a new app
   - Either press enter to confirm the default values or change them to apply to your requirements
   - Enter `y` to confirm the information and confirm the changes
   - You should see the message `Successfully pushed app up: <APP ID>`
6. Copy the App ID shown in the console
7. Open the file `/task-tracker/src/realm/constants.js` and replace `APP_ID_HERE` with the ID you copied
8. Run `npm install` in the directory `task-tracker`
9. Start the application via `npm start`

Feel free to explore the implementation on Atlas App Services and extend the capabilities e.g. by implementing Atlas Search.

If you are using a dedicated or a serverless cluster you can also host the application on Atlas App Services using [hosting](https://www.mongodb.com/developer/products/atlas/host-react-app-using-atlas-app-services/)

Have fun! :)

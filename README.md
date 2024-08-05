# task-management-poc

# HOW TO START APP
To start this app run "npm start" in one terminal and iin another terminal run the  server by "nodemon server.js" 

# Task Management Application

This application helps users manage their tasks efficiently. Users can view and handle various tasks, assign tasks to other users, create new tasks, and filter tasks based on different conditions. The application includes several features and functionalities to streamline task management.

## Navigation

- **Process Page**: The default landing page.
- **Users Page**: Accessible via the breadcrumb at the top-right corner or by adding `/users` to the URL.

## Pages and Functionalities

### Users Page

- **User Details**: Displays user information.
- **Get Tasks Button**: Fetches and displays tasks for the selected user.

### User Tasks Page (`GetUsersTask.js`)

The User Tasks page supports several functionalities:

1. **Navigation**: Move to different pages using the breadcrumb at the top-left corner.
2. **View Task Details**: Click the `View` button to see detailed information about a task.
3. **Create Subtasks**: Create subtasks for a given task.
4. **Create New Tasks**: Add new tasks.
5. **Filter Tasks**: Filter tasks based on various conditions.
6. **Delegate Tasks**: Assign tasks to another user.
7. **Complete or Resolve Tasks**: Mark tasks as complete or resolved.

### Task View Modal (`TaskViewModal.js`)

The Task View Modal provides several functionalities for detailed task management:

1. **Change Assignee**: Update the assignee of the task.
2. **Set Due Date**: Set and process the due date for the task.
3. **Involve Agents**: Involve and display agents working on the task.
4. **Create Subtasks**: Add and display subtasks.
5. **Add Comments**: Add and display comments related to the task.
6. **Involve Groups**: Involve and display groups working on the task.
7. **Complete or Resolve Tasks**: Mark the task as complete or resolved.

### Modals and Their Functionalities

- **CreateModal.js**: Used for creating subtasks and new tasks.
- **FilterModal.js**: Used for filtering tasks based on various conditions.
- **AssignModal.js**: Used for delegating tasks to other users.
- **CompleteModal.js**: Used for marking tasks as complete or resolved.
- **TimeSince.js**: Used for setting and processing due dates.

## Summary

This task management application provides a comprehensive set of features to help users manage tasks effectively. With the ability to create, assign, filter, and resolve tasks, users can maintain productivity and ensure tasks are completed on time.


# Getting Started with Create React App
​
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
​
## Available Scripts
​
In the project directory, you can run:
​
### `npm start`
​
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
​
The page will reload when you make changes.\
You may also see any lint errors in the console.
​
### `npm test`
​
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
​
### `npm run build`
​
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
​
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
​
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
​
### `npm run eject`
​
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
​
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
​
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
​
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
​
## Learn More
​
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
​
To learn React, check out the [React documentation](https://reactjs.org/).
​
### Code Splitting
​
This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
​
### Analyzing the Bundle Size
​
This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
​
### Making a Progressive Web App
​
This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
​
### Advanced Configuration
​
This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
​
### Deployment
​
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
​
### `npm run build` fails to minify
​
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# flowable-poc

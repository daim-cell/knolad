
# How to start the project
- Visit the page https://docs.npmjs.com/downloading-and-installing-node-js-and-npm, to install npm and nodejs into your system
- Once npm is installed, go to your command line and enter the command **npm i**. This will install all the packages in package.json
- After the packages are installed, enter the command **npm run dev**. This will statr the server at _http://localhost:3000_. Open the link in a browser.
- The user already created is of type 'admin'. The credentials are 'admin' and 'admin123'. Once entered this will take you to the app homepage.

## How the app is set up
Once logged in the user can have one of the following three views:

### Admin & Teacher

- **Create Survey**: This has a form that has 15 questions that will be used for creating new surveys. You have to add a survey name, questions, their options and also input the correct ones. Enter the submit button at the bottom page to create a new survey.
- **View Surveys**: This shows all the surveys you have created. The open switch corresponding to each survey show that whether the admin wants to open this survey for students. Switch feft means survey is close and vice versa.
- **Student History**: To show the history to the test takers. There is dropdown at the top that can filter the history according to the survey. The history shows survey taker name, survey name, survey result and time taken for survey.
- **Create User(Only allowed for admins to use)**: To create a new user enter the username and password and select the type of user. Click the register button to confirm the registration of the new user.
- **Logout**

### Student

- **Take Surveys**: This will take the user to a list of surveys allowed by admins and teachers for students to take. Once user selects one of them, app redirects him/her to the game page, where he/she answer by clicking on the one of the options and pressing the submit button. Once the game is finished the student is taken back to take surveys page, where he/she can take another one or just press the home button to go to home page.
- **Logout**



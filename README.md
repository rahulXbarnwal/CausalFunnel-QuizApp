# Quiz Application

### Link - https://causalfunnel-quizapp.netlify.app/

### Technologies Used
```
React.js, Redux, Material-UI
```

### Installation Instructions
```
Open your terminal in respective folder, write following commands - 
npm install
npm start
```

### Features of the Application
```
1. Protected Routing - Can't jump to questions page directly without entering the email
2. Can't jump to Report page without submitting the quiz
3. Redux toolkit is used as a state-management tool
4. The Time left, questions, User response & current Color of the question boxes is stored and displayed using Redux
5. RED Color of a Question Box - means that question is NOT VISITED
6. YELLOW Color of a Question Box means that question is VISITED & NOT ANSWERED
7. GREEN Color of a Question Box means that question is ANSWERED
8. Quiz will submit automatically upon TIMEOUT
9. When you will RE-VISIT a Question, The options will be SHUFFLED
```

### Information Regarding Components
```
1. StartPage.jsx Component consists of a field that requires an email Address
2. Upon entering and clicking on start the questions are fetched from the given API and the state of redux is initialised
3. The QuestionPage.jsx Component will consist of two panels - left and right panels, on the left panel, questions will be displayed along with shuffled options and on the right panel the box of every questions will be displayed which can be used to navigate to different questions
4. This navigation is done by changing the state (index)
5. Upon clicking on submit button the isSubmitted key of user state is set to True and timer is set to 0
6. The ReportPage.jsx Component consists of a tabular view of questions, correct_answers and response of the user
```

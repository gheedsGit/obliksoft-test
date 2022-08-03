# Inboost Front-End Tech Interview Test

The aim of the test is to develop a mini-application for managing TODO tasks. Using your application we must be able to create, modify and delete a task.

A really simple server has been implemented with Express. It offers the minimum of expected functionalities (get the list of tasks, update a task, delete a task, save a task). However this server is not perfect. It could be improved and tested as well.

Your mission is to develop the front-end from scratch using a front-end framework. We are also expecting from you a usable, responsive UI.

## Proccess

npm i [ install dependencies ] <br />
npm start [ starts node js server with simple api for todo list ]

## Api

http://localhost:9001/tasks [ GET ] - get all todo's <br />
http://localhost:9001/tasks:id [ GET ] - get specific todo <br />
http://localhost:9001/task/update [ POST ] json body {"title": string, "description": string, "id": number } - update task <br />
http://localhost:9001/task/create [ POST ] json body {"title": string, "description": string} - update task <br />
http://localhost:9001/task/delete/:id [ DELETE ] - delete task <br />

## Requirements

-   React 16+
-   Good state management
-   Typescript 4+
-   Sass
-   Responsive design
-   Linting

-   Node js v16.13.1

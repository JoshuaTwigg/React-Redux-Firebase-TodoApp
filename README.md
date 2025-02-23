![22](https://github.com/user-attachments/assets/c9d939cd-ec1c-4a0a-92fc-65a9ca810a47)
![11](https://github.com/user-attachments/assets/3139d895-29ca-419e-99f4-74a4634e11bd)

-----------
Overview
---------
this project is a simple todo app.
- Redux allows users to add,remove,update,delete tasks from the table and the firestore database (CRUD).
- Firebase handles user authentication for registration and login.
- ui is mainly built with boostrap
-------------
Detailed Overview
------------
Redux reducers(functions) are called on the Todo component page, when clicking
on either buttons select, submitItem or using the table icons of pen,trashbin,tick

within these calls, the database queries are being run to accomplish CRUD
---------------
Dependencies
-------------------
npm install - should install all dependencies needed, through dependencies listed in package.json
--------
!otherwise run 1 by 1:
npm install react-bootstrap bootstrap
npm install react-icons
npm install firebase
npm install -g firebase-tools
npm install @reduxjs/toolkit


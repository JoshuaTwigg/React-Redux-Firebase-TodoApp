# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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

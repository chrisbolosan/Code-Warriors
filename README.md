# CODE WARRIORS

![Screen Shot 2021-09-07 at 7 47 30 PM (2)](https://user-images.githubusercontent.com/65192723/132424259-10d48180-b9de-42cb-9a98-9265e69ffa75.png)
<hr />
Code Warriors is the new fun way to prep for coding interviews. It's an interactive multiplayer game where players can challenge each other to a round of solving algorithms.

## Technology Stack & Tools 

Code Warriors implements the NERD (Node, Express, React/Redux, Database using SQL) stack along with Socket.io.

**Frontend**

<!-- React Redux was used to manage our applications state.  -->

**Backend**

_MongoDB Atlas_ was used as our DBMS. This allowed us to use a common set of data points without the overhead of relations in a relational database such as Postgres or MySQL. To interface with our database, we used _Mongoose_ as our ODM and _Express_ and _Node_ to establish our server and API routes.

**Other Technologies**

_Socket.io_ was a key part of our web application that provided asynchronous real-time PvP interactions.

[_Code Mirror_](https://codemirror.net/) is a versatile text editor implemented in Javascript for the browser. It is specialized for editing code, and comes with addons that implement more advanced editing functionality. 

[_Javascript Code Runner Package_](https://www.npmjs.com/package/javascript-code-runner) is a package based on Google's Neil Fraser's package, JS-Interpreter and allows the execution of Javascript code. It does not support ES6 code. 

## Local Setup

We used the [_Create-React-App_](https://github.com/facebook/create-react-app) boilermaker as the base of our project and built off of it.

```
  yarn install
```

```
  yarn start:dev
```

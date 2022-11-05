# Demo Full Stack App

## Created on: 5/12/2022

### Stach Used:

- Node JS
- Express
- MongoDB
- React JS

Run full app with `yarn dev` command

To steps to initaite app:

1. Install all server yarn packages `yarn install`
2. Install all client yarn packages `cd client && yarn install`
3. Include .env file in server directory with **MONGODB_URI** and **JWT_TOKEN** variables with appropriate values (**PORT** variable is optional if you want to configure app to use specific port)
4. Include .env file in client directory with **REACT_APP_API_URL** variable, which corresponds to http://localhost:8080 or the port that you configured for the server

<hr />

**Description**: This is a full stack MEAN application with the ability to perform CRUD operations for blog posts and user authentication.

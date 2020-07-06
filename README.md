## Available Scripts

In the project directory, you can run:

## React Application

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

NOTE: Set env variable `REACT_APP_API_HOST` to the node API URL.

## Node Application

### `npm run server:start`

Runs node server in development environment on port `3001` with reload on file changes. To change the port set environment variable `PORT`.

### `npm run server:prod:start`

Runs node server on port `3001`. To change the port set environment variable `PORT`.

NOTE: Set `DATABASE_URL` environment variable with the Mongodb database URL.

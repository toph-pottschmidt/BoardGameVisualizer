import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const PageNotFound = ({ location }) => 
<p>
Page not found - the path, <code>{location.pathname}</code>, did not match
any React Router routes.
</p>

const Error = ({ location }) => 
<p>
This site generated an error.
</p>



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {/* <BrowserRouter basename={"/"}> */}
      <Routes>
        <Route 
          exact
          path="/"
          element={<App />}
          errorElement={<Error />}
        />
        <Route
          element={(props) => <PageNotFound {...props} />}
          errorElement={<Error />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

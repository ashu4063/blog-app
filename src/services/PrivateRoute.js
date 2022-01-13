import React from "react";
import { Redirect, Route } from "react-router-dom";
import Layout from "../layout/Layout";
export const PrivateRoute = ({ element: Element, ...params }) => (
  <Route
    {...params}
    render={(props) =>
      
        <Layout>
          <Element {...props} {...params} />
        </Layout>
      }
  />
);

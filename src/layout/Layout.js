import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom"
//use lazyload for optimized loading
const HomePageLayout = React.lazy(() => import("./HomePageLayout"));
const loading = () => (
  <div className="text-center">
    <p>Loading</p>
  </div>
);
//always use class component
export class Layout extends Component {
  render() {
    // dashboard layout
    return (
      <Suspense fallback={loading()}>
        <HomePageLayout />
        <Suspense fallback={loading()}>{this.props.children}</Suspense>
      </Suspense>
    );
  }
}

export default Layout;
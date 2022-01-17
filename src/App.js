import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AllPosts from './pages/AllPosts'
import LoginPage from './pages/LoginPage'
import BlogForm from './pages/BlogForm'
import "./firebaseConfig";
import SignUp from './pages/SignUp'
import Sidebar from "./layout/DashboardLayout"
import BlogList from './pages/BlogList'
import BlogLanding from './pages/BlogLanding'
import Layout from './layout/Layout'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<Layout><AllPosts /></Layout>} />
        <Route exact path="/blog/:id" element={<Layout><BlogLanding /></Layout>} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/blogform" element={
          <Sidebar>
            <BlogForm />
          </Sidebar>} />
        <Route exact path="/blogform/:id" element={
          <Sidebar>
            <BlogForm />
          </Sidebar>} />
        <Route exact path="/bloglist" element={
          <Sidebar>
            <BlogList />
          </Sidebar>} />
      </Routes>
    </Router>
  )
}

export default App
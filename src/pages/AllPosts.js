import React, { useEffect, useState } from 'react'
// card component
import BlogCard from '../components/Card'
// firestore imports
import { db } from '../firebaseConfig'
import { getDocs, collection } from "firebase/firestore";


const AllPosts = () => {
  const [blogList, setBlogList] = useState([])
  const blogsCollectionRef = collection(db, "blogs");

  const getBlogs = async () => {
    const data = await getDocs(blogsCollectionRef)
    setBlogList(data.docs.map((doc) =>
      ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getBlogs();
  }, [])



  return (
    <section className='blogLayout'>
      <h1>All Blogs</h1>
      <div className='row mt-5'>
        <BlogCard blogs={blogList} />
      </div> </section>
  )
}


export default (AllPosts)
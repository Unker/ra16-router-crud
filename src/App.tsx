import { Route, Routes } from 'react-router-dom'

import Home from './components/Home';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

interface Post {
  id: number;
  author: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:7070/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="home-container">
      <h1>Главная страница</h1>
      <Link to="/posts/new" className="create-post-link">
        Создать пост
      </Link>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.imageUrl} alt={`Post ${post.id}`} />
            <div className="post-details">
              <p>{`Автор: ${post.author}`}</p>
              <p>{`ID: ${post.id}`}</p>
              <p>{`Содержание: ${post.content}`}</p>
              <p>{`Дата создания: ${post.createdAt}`}</p>
              <Link to={`/posts/${post.id}`} className="view-post-link">
                Просмотреть пост
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

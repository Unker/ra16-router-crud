import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../utils/dateUtils';
import './Home.css';

interface Post {
  id: number;
  author: string;
  content: string;
  imageUrl: string;
  created: string;
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
      <Link to="/posts/new" className="create-post-button">
        Создать пост
      </Link>
      <div className="post-list">
        {posts.length === 0 ? (
          <div className="placeholder-post">
            <p>Здесь пока нет постов. Создайте свой первый пост!</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-card">
              <img src={post.imageUrl} alt={`Post ${post.id}`} />
              <div className="post-details">
                <p>{`Автор: ${post.author}`}</p>
                <p>{`ID: ${post.id}`}</p>
                <p>{`Содержание: ${post.content}`}</p>
                <p>{`Дата создания: ${formatTimestamp(post.created)}`}</p>
                <Link to={`/posts/${post.id}`} className="view-post-button">
                  Просмотреть пост
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatTimestamp } from '../utils/dateUtils';
import './PostDetails.css';

interface RouteParams {
  postId: string;
  [key: string]: string | undefined;
}

interface Post {
  id: number;
  author: string;
  content: string;
  imageUrl: string;
  created: string;
}

const PostDetails: React.FC = () => {
  const { postId } = useParams<RouteParams>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`http://localhost:7070/posts/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post details:', error));
  }, [postId]);

  if (!post) {
    return (
      <div className="post-details-container">
        <h1>{`Просмотр карточки поста #${postId}`}</h1>
        <div className="placeholder-post">
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-details-container">
      <h1>{`Просмотр карточки поста #${postId}`}</h1>
      <img src={post.imageUrl} alt={`Post ${post.id}`} className="post-image" />
      <div className="post-details">
        <p>{`Автор: ${post.author}`}</p>
        <p>{`ID: ${post.id}`}</p>
        <p>{`Содержание: ${formatTimestamp(post.created)}`}</p>
        <p>{`Дата создания: ${post.created}`}</p>
      </div>
    </div>
  );
};

export default PostDetails;

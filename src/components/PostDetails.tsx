import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { formatTimestamp } from '../utils/dateUtils';
import EditPost from './EditPost';

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
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:7070/posts/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data.post))
      .catch(error => console.error('Error fetching post details:', error));
  }, [postId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:7070/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Пост успешно удален, переходим на главную страницу
        navigate('/');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEdit = async (newContent: string) => {
    try {
      const response = await fetch(`http://localhost:7070/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(postId),
          content: newContent,
        }),
      });

      if (response.ok) {
        // Пост успешно отредактирован, переходим к просмотру
        setEditing(false);
        setPost(prevPost => {
          if (prevPost) {
            return { ...prevPost, content: newContent };
          }
          return prevPost;
        });
      } else {
        console.error('Failed to save edited post');
      }
    } catch (error) {
      console.error('Error saving edited post:', error);
    }
  };

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
      {!editing && (
        <>
          <h1>{`Просмотр карточки поста #${postId}`}</h1>
          <img src={post.imageUrl} alt={`Post ${post.id}`} className="post-image" />
          <div className="post-details">
            <p>{`Автор: ${post.author}`}</p>
            <p>{`ID: ${post.id}`}</p>
            <p>{`Содержание: ${post.content}`}</p>
            <p>{`Дата создания: ${formatTimestamp(post.created)}`}</p>
            <div>
              <button className='edit-button' onClick={handleEdit}>Изменить</button>
              <button className='delete-button' onClick={handleDelete}>Удалить</button>
            </div>
          </div>
        </>
      )}

      {editing && (
        <EditPost
          postId={Number(postId)}
          initialContent={post.content}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      )}

    </div>
  );
};

export default PostDetails;

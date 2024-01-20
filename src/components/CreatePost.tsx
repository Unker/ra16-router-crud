import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      const response = await fetch('http://localhost:7070/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          content: postContent,
        }),
      });

      if (response.ok) {
        // Пост успешно создан, переходим на главную страницу
        navigate('/');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCancel = () => {
    // Просто переходим на главную страницу без сохранения
    navigate('/');
  };

  return (
    <div className="create-post-container">
      <h1>Создать пост</h1>
      <textarea
        className="post-content-input"
        placeholder="Введите текст поста..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <div className="button-container">
        <button className="publish-button" onClick={handlePublish}>
          Опубликовать
        </button>
      </div>
      <button className="cancel-button" onClick={handleCancel}>
          ❌
      </button>
    </div>
  );
};

export default CreatePost;

import React, { useState } from 'react';

interface EditPostProps {
  postId: number;
  initialContent: string;
  onCancel: () => void;
  onSave: (newContent: string) => void;
}

const EditPost: React.FC<EditPostProps> = ({ postId, initialContent, onCancel, onSave }) => {
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleSave = () => {
    onSave(editedContent);
  };

  return (
    <div>
      <h1>Редактировать пост</h1>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        placeholder="Введите текст поста..."
      />
      <div>
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={onCancel}>Отмена</button>
      </div>
    </div>
  );
};

export default EditPost;
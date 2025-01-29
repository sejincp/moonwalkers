import './MoonwalkItem.css';
import { useState } from 'react';

export default function MoonwalkItem({
  moonwalk,
  hideComments = false,
  onCommentSubmit,
}) {
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (evt) => {
    setCommentText(evt.target.value);
  };

  const handleCommentSubmit = async (evt) => {
    evt.preventDefault();
    if (!commentText.trim()) return;

    try {
      await onCommentSubmit(moonwalk._id, commentText);
      setCommentText('');
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };

  return (
    <article>
      <h4>
        🌝 {moonwalk.user.name} made {moonwalk.distance} Moonwalks
      </h4>
      <p>
        <strong>Description:</strong> {moonwalk.description}
      </p>
      <p>
        <strong>Date:</strong>
        {new Date(moonwalk.createdAt).toLocaleDateString()}
      </p>
      <div className={hideComments ? 'hidden' : ''}>
        <hr />
        <p>
          <strong>Comments ({moonwalk.comments.length})</strong>
        </p>
        <ul>
          {moonwalk.comments.map((comment) => (
            <li key={comment._id}>
              {comment.text} (by {comment.author.name})
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Comment here"
            value={commentText}
            onChange={handleCommentChange}
            required
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </article>
  );
}

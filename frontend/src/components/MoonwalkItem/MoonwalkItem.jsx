import './MoonwalkItem.css';
import { useLocation } from 'react-router';
import CommentForm from '../CommentForm/CommentForm';
import * as moonwalkService from '../../services/moonwalkService';

export default function MoonwalkItem({
  user,
  moonwalk,
  moonwalks,
  setMoonwalks,
  hideComments = false,
  onDelete,
}) {
  
  const location = useLocation();
  console.log(location);
  const GOAL_STEPS = 500000000;
  
  const handleAddComment = async (commentFormData) => {
    const moonwalkId = moonwalk._id;
    try {
      const updatedMoonwalk = await moonwalkService.createComment(moonwalkId, commentFormData);
      setMoonwalks(moonwalks.map((mw) => mw._id === moonwalkId ? updatedMoonwalk : mw));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this?'
    );
    if (!confirmDelete) return;

    try {
      await onDelete(moonwalk._id);
    } catch (err) {
      console.error('Failed to delete moonwalk:', err);
    }
  };

  if (!moonwalk) return null;

  return (
    <article>
      <h5>
        🌝 {moonwalk.user.name} made {moonwalk.distance} Moonwalks
      </h5>
      {location.pathname !== '/' && <div className={hideComments ? 'hidden' : ''}>
      <p>
        <strong>Description:</strong> {moonwalk.description}
      </p>
      <p>
        <strong>Date:</strong>{' '}
        {new Date(moonwalk.createdAt).toLocaleDateString()}
      </p>

        {user._id === moonwalk.user._id && <button onClick={() => handleDelete()}>🗑️ Delete Moonwalk</button>}
        <hr />
        <section>
          <h2>Comments</h2>
          <CommentForm handleAddComment={handleAddComment}/>
          {moonwalk.comments.map((comment) => (
            <article key={comment._id}>
                <p>
                  {`${comment.author.name} commented on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
                </p>
              <p>{comment.text}</p>
              {user._id === moonwalk.user._id && <button onClick={() => handleDelete()}>🗑️ Delete comment</button>}
            </article>
          ))}
          {!moonwalk.comments.length && <p>There are no comments.</p>}
        </section>
      </div> }
    </article>
  );
}

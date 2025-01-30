import './MoonwalkItem.css';
import { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import * as moonwalkService from '../../services/moonwalkService';

export default function MoonwalkItem({
  moonwalk,
  moonwalks,
  setMoonwalks,
  hideComments = false,
  // commentSubmit,
  // commentDelete,
  onDelete,
}) {
  
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

  // const handleCommentChange = (evt) => {
  //   setCommentText(evt.target.value);
  // };

  // const handleCommentSubmit = async (evt) => {
  //   evt.preventDefault();
  //   if (!commentText.trim()) return;

  //   try {
  //     await commentSubmit(moonwalk._id, commentText);
  //     setCommentText('');
  //   } catch (err) {
  //     console.error('Failed to submit comment:', err);
  //   }
  // };

  // const handleCommentDelete = async (commentId) => {
  //   try {
  //     await commentDelete(moonwalk._id, commentId);
  //   } catch (err) {
  //     console.error('Failed to delete comment:', err);
  //   }
  // };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Moonwalk?'
    );
    if (!confirmDelete) return;

    try {
      await onDelete(moonwalk._id);
    } catch (err) {
      console.error('Failed to delete moonwalk:', err);
    }
  };

  if (!moonwalk) return null;

  const totalStepsSoFar = moonwalk.steps.reduce(
    (total, step) => total + step.stepCount,
    0
  );

  return (
    <article>
      <h4>
        🌝 {moonwalk.user.name} made {moonwalk.distance} Moonwalks
      </h4>
      <p>
        <strong>Description:</strong> {moonwalk.description}
      </p>
      <p>
        {`Currently ${totalStepsSoFar} (${((totalStepsSoFar / GOAL_STEPS) * 100).toFixed(1)}%) steps toward goal of ${GOAL_STEPS}`}
      </p>
      <p>
        <strong>Date:</strong>{' '}
        {new Date(moonwalk.createdAt).toLocaleDateString()}
      </p>

      <div className={hideComments ? 'hidden' : ''}>
        <button onClick={() => handleDelete()}>🗑️ Delete Moonwalk</button>
        <hr />
        <section>
          <h2>Comments</h2>
          <CommentForm handleAddComment={handleAddComment}/>
          {moonwalk.comments.map((comment) => (
            <article key={comment._id}>
              <header>
                <p>
                  {`${comment.author.name} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
                </p>
              </header>
              <p>{comment.text}</p>
            </article>
          ))}
          {!moonwalk.comments.length && <p>There are no comments.</p>}
        </section>
      </div>
    </article>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as postService from '../../services/moonwalkService';

export default function NewPostPage() {
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const post = await postService.create(content);
      navigate('/posts');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>Add New Moonwalk</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
      <label>Total Steps</label>
        <input
          type="text"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
        />
      <label>Date</label>
        <input
          type="text"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
        />
        <label>Comment</label>
        <input
          type="text"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
        />
        <button type="submit">Add Moonwalk</button>
      </form>
    </>
  );
}

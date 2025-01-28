import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as moonwalkService from '../../services/moonwalkService';

export default function NewMoonwalkPage() {
  const [content, setContent] = useState({
    steps: 0,
    comment: ''
  });

  const [miles, setMiles] = useState(0);

  const navigate = useNavigate();
  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if ( name === 'steps' ) {
      const steps = Number(value);
      if (!isNaN(steps)) {
        setMiles((steps / 2000).toFixed(2));
      } else {
        setMiles(0);
      }
    };
    setContent({
      ...content,
      [name]: value
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const post = await moonwalkService.create(content);
      navigate('/moonwalks');
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
          type="number"
          value={content.steps}
          onChange={handleChange}
          required
        />
        <label>Comment</label>
        <input
          type="text"
          value={content.comment}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Moonwalk</button>
      </form>
    </>
  );
}

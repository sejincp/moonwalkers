import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as moonwalkService from '../../services/moonwalkService';

export default function NewMoonwalkPage() {
  const [content, setContent] = useState({
    steps: 0,
    description: ''
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
      [name]: name === 'steps' ? Number(value) : value
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const moonwalk = await moonwalkService.create(content);
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
          name="steps"
          value={content.steps}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={content.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Moonwalk</button>
      </form>
    </>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as moonwalkService from '../../services/moonwalkService';

export default function NewMoonwalkPage() {
  const [moonwalkData, setMoonwalkData] = useState({
    distance: '',
    description: '',
  });

  const navigate = useNavigate();
  
  const handleChange = (evt) => {
    setMoonwalkData({
      ...moonwalkData,
      [evt.target.name]: evt.target.value,
    });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const moonwalk = await moonwalkService.create(moonwalkData);
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
          name="distance"
          value={moonwalkData.distance}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={moonwalkData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Moonwalk</button>
      </form>
    </>
  );
}

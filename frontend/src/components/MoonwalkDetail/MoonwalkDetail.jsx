import { useParams, Link } from 'react-router';

export default function MoonwalkDetail(props) {
  return (
    <>
      <h2>Edit Moonwalk</h2>
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
        <label>Date</label>
        <label>{new Date().toLocaleDateString()}</label>
        <button type="submit">Add Moonwalk</button>
      </form>
    </>
  );
}

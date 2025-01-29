import { Link } from 'react-router';

export default function MoonwalkItem({ moonwalk }) {
  return (
    <article>
      <h4>🌝 {moonwalk.user.name} made {moonwalk.distance} Moonwalks</h4>
      <p><strong>Description:</strong> {moonwalk.description}</p>
      <p><strong>Date:</strong>{new Date(moonwalk.createdAt).toLocaleDateString()}</p>
      <p><strong>Comments:</strong></p>
      <ul>
        {moonwalk.comments.map((comment) => (
          <li key={comment._id}>
            {comment.text} (by {comment.author.name})
          </li>
        ))}
      </ul>
    </article>
  );
}

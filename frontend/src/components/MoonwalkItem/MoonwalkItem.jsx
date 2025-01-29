export default function MoonwalkItem({ moonwalk }) {
  return (
    <article>
      <h4>{new Date(moonwalk.createdAt).toLocaleDateString()}</h4>
      <p>{moonwalk.content}</p>
      <h4>🌝 {moonwalk.user.name}</h4>
    </article>
  );
}

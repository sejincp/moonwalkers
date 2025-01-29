export default function MoonwalkDetail(props) {

  return (
    <>
      <h2>Moonwalk Detail</h2>
      <p>{ props.selected.date }</p>
      <p>{ props.selected.steps }</p>
      <p>{ props.selected.username }</p>
    </>
  );
}

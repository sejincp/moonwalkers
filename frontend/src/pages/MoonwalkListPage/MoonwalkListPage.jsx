import { useState, useEffect } from 'react';
import * as moonwalkService from '../../services/moonwalkService';
import './MoonwalkListPage.css';
import MoonwalkItem from '../../components/MoonwalkItem/MoonwalkItem';

export default function MoonwalkListPage() {
  const [moonwalks, setMoonwalks] = useState([]);

  useEffect(() => {
    async function fetchMoonwalks() {
      const moonwalks = await moonwalkService.index();
      setMoonwalks(moonwalks);
    }
    fetchMoonwalks();
  }, []);

  const moonwalkItems = moonwalks.map((p) => <MoonwalkItem key={p._id} moonwalk={p} />);

  return (
    <>
      <h1>Community (Moonwalk List)</h1>
      <section className="moonwalk-item-container">{moonwalkItems}</section>
    </>
  );
}

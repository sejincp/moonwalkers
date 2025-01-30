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

  const handleDeleteMoonwalk = async (id) => {
    try {
      await moonwalkService.deleteMoonwalk(id);
    } catch (err) {
      console.error('Failed to delete moonwalk', err);
    }
  };

  return (
    <>
      <h1>Community (Moonwalk List)</h1>
      <section className="moonwalk-item-container">
        {moonwalks.map((moonwalk) => (
          <MoonwalkItem
            key={moonwalk._id}
            moonwalk={moonwalk}
            moonwalks={moonwalks}
            setMoonwalks={setMoonwalks}
            onDelete={handleDeleteMoonwalk}
          />
        ))}
      </section>
    </>
  );
}

import { useState, useEffect } from 'react';
import * as moonwalkService from '../../services/moonwalkService';
import './MoonwalkListPage.css';
import MoonwalkItem from '../../components/MoonwalkItem/MoonwalkItem';

export default function MoonwalkListPage({user}) {
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
      setMoonwalks(moonwalks.filter((mw) => mw._id !== id));
    } catch (err) {
      console.error('Failed to delete moonwalk', err);
    }
  };

  return (
    <>
      <h2 className="title">Moonwalks</h2>
      <section className="moonwalk-item-container">
        {moonwalks.map((moonwalk) => (
          <MoonwalkItem
            key={moonwalk._id}
            user={user}
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

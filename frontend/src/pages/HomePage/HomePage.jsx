import { useState, useEffect } from 'react';
import * as moonwalkService from '../../services/moonwalkService';
import './HomePage.css';
import MoonwalkItem from '../../components/MoonwalkItem/MoonwalkItem';

export default function HomePage() {
  const [moonwalks, setMoonwalks] = useState([]);

  useEffect(() => {
    async function fetchMoonwalks() {
      const moonwalks = await moonwalkService.index();
      setMoonwalks(moonwalks);
    }
    fetchMoonwalks();
  }, []);

  return (
    <>
      <h5>“We crossed the USA! 🌎 (3,000 miles achieved!)”</h5>
      <h1>Now *13%* Reached</h1>
      <span>*3,010.14* / *238,900* Miles    |    *6,300,000* / *500,000,000* Steps</span>
      <button>Add my Moonwalk</button>
      <section className="moonwalk-item-container">
        <h3>Recent Activity</h3>
        <div>
        {moonwalks.map((moonwalk) => (
          <MoonwalkItem key={moonwalk._id} moonwalk={moonwalk} />
        ))}

        </div>
      </section>
    </>
  );
}

import { useState, useEffect } from 'react';
import * as moonwalkService from '../../services/moonwalkService';
import './HomePage.css';
import MoonwalkItem from '../../components/MoonwalkItem/MoonwalkItem';
import { Link } from 'react-router';
import NewMoonwalkPage from '../NewMoonwalkPage/NewMoonwalkPage';

export default function HomePage() {
  const [moonwalks, setMoonwalks] = useState([]);

  useEffect(() => {
    async function fetchMoonwalks() {
      const moonwalks = await moonwalkService.index();
      setMoonwalks(moonwalks);
    }
    fetchMoonwalks();
  }, []);

  // Milestones
  const GOAL_STEPS = 500000000;
  const GOAL_MILES = GOAL_STEPS * 0.004;
  const CURRENT_STEPS = 33500;
  const CURRENT_MILES = CURRENT_STEPS * 0.004;
  

  return (
    <>
      <h5>“We crossed the USA! 🌎 (3,000 miles achieved!)”</h5>
      <h1>Now {((CURRENT_MILES / GOAL_MILES) * 100).toFixed(1)}% Reached</h1>
      <span>
      {CURRENT_MILES} / {GOAL_MILES} Miles | {CURRENT_STEPS} / {GOAL_STEPS} Steps
      </span>
      <Link to="/moonwalks/new">
        <button>Add my Moonwalk</button>
      </Link>
      <section className="moonwalk-item-container">
        <h3>Recent Activity</h3>
        <div>
          {moonwalks.map((moonwalk) => (
            <MoonwalkItem
              key={moonwalk._id}
              moonwalk={moonwalk}
              hideComments={true}
            />
          ))}
        </div>
        <Link to="/moonwalks">
        <button>See More</button>
      </Link>
      </section>
    </>
  );
}

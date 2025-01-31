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

  // Where are we
  const GOAL_STEPS = 500000000;
  const GOAL_MILES = GOAL_STEPS * 0.004;

  const totalStepsSoFar = moonwalks.reduce(
    (total, mw) => total + mw.distance,
    0
  );
  const CURRENT_MILES = totalStepsSoFar * 0.004;
  const overallProgress = `${((totalStepsSoFar / GOAL_STEPS) * 100).toFixed(
    3
  )}%`;

  return (
    <>
      <section className="where-are-we">
        <div className="milestone">
          <h5>“We crossed the USA! 🌎 (3,000 miles achieved!)”</h5>
        </div>
        <h1>Now {overallProgress} Reached</h1>
        <span>
          {CURRENT_MILES} / {GOAL_MILES} Miles | {totalStepsSoFar} /{' '}
          {GOAL_STEPS} Steps
        </span>
        <Link to="/moonwalks/new">
          <button>Add my Moonwalk</button>
        </Link>
      </section>
      <section className="recent-activity">
        <div className="moonwalk-item-home-container">
          <h3>Recent Activity</h3>
          {moonwalks.slice(0, 5).map((moonwalk) => (
            <MoonwalkItem
              key={moonwalk._id}
              moonwalk={moonwalk}
              hideComments={true}
            />
          ))}
          <Link to="/moonwalks">
            <button>See More</button>
          </Link>
        </div>
      </section>
    </>
  );
}

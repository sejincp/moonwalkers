import { useState, useEffect } from 'react';
import * as moonwalkService from '../../services/moonwalkService';
import './HomePage.css';
import MoonwalkItem from '../../components/MoonwalkItem/MoonwalkItem';
import { Link } from 'react-router';

export default function HomePage({ bgSize, setBgSize }) {
  const [moonwalks, setMoonwalks] = useState([]);

  useEffect(() => {
    async function fetchMoonwalks() {
      const moonwalks = await moonwalkService.index();
      setMoonwalks(moonwalks);
    }
    fetchMoonwalks();
  }, []);

  
  
  // Where are we
  const GOAL_STEPS = 500000000;
  const GOAL_MILES = GOAL_STEPS * 0.004;
  
  const totalStepsSoFar = moonwalks.reduce(
    (total, mw) => total + mw.distance,
    0
  );
  
  // Calculate the background size as a percentage of the total steps
  const calculatedSize = (totalStepsSoFar / GOAL_STEPS) * 100;
  const maxSize = 3000;
  const bgSizeInPixels = Math.min(calculatedSize, maxSize);
  
  const CURRENT_MILES = totalStepsSoFar * 0.004;
  const overallProgress = `${((totalStepsSoFar / GOAL_STEPS) * 100).toFixed(
    3
  )}%`;
  
  // Milestones
  const milestoneMessages = [
    { milestone: 3000, message: "We crossed the USA! 🌎 (3,000 miles achieved!)" },
    { milestone: 10000, message: "We reached 10,000 miles!💫" },
    { milestone: 50000, message: "We reached 50,000 miles!💫" },
    { milestone: 100000, message: "We reached 100,000 miles!💫" },
    { milestone: 200000, message: "We reached 200,000 miles!💫" },
    { milestone: 500000, message: "Half a way!💫" },
  ];

  const milestoneMessage = milestoneMessages
    .filter(milestone => CURRENT_MILES >= milestone.milestone)
    .sort((a, b) => b.milestone - a.milestone)[0];

  // Slider
  const [sliderValue, setSliderValue] = useState(calculatedSize);

  const handleSliderChange = (e) => {
    const newSliderValue = Number(e.target.value);
    setSliderValue(newSliderValue);

    const updatedBgSize = (newSliderValue / 100) * maxSize;
    setBgSize(updatedBgSize);
  };

  const progressPercentage = ((sliderValue / 100) * GOAL_STEPS).toFixed(0);
  const progressMiles = (progressPercentage * 0.004).toFixed(2);

  return (
    <>
      <section className="where-are-we">
        <div className="milestone">
          {milestoneMessage && <h5>{milestoneMessage.message}</h5>}
        </div>
        <h1>Now {overallProgress} Reached</h1>
        <span>
          {CURRENT_MILES} / {GOAL_MILES} Miles &nbsp;|&nbsp;  {totalStepsSoFar} / {GOAL_STEPS} Steps
        </span>
        <div className="slider-container">
          <label>
            Preview: {progressPercentage} / {GOAL_STEPS} Steps | {progressMiles} / {GOAL_MILES} Miles
          </label>
          <input
            type="range"
            min="0"
            max={100}
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </div>
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

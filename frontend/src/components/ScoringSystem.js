import React from 'react';

const ScoringSystem = ({ tasks }) => {
  const totalScore = tasks.reduce(
    (sum, task) => sum + (task.is_completed ? task.score : 0),
    0
  );

  return <h3>Total Score: {totalScore}</h3>;
};

export default ScoringSystem;

import React from 'react';
import '../styles/AnimatedBorders.css';

const AnimatedBorders = () => {
  return (
    <>
      <div className="animated-border vertical-border-left"></div>
      <div className="animated-border vertical-border-right"></div>
      <div className="animated-border horizontal-border"></div>
    </>
  );
};

export default AnimatedBorders;

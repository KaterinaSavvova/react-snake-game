import React from 'react';

export const Food = ({ dot }) => {
  return (
    <div
      className="snake-food"
      style={{left: `${dot[0]}%`, top: `${dot[1]}%`}}
    />
  )
};

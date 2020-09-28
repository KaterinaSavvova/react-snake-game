import React from 'react';

export const Snake = ({ snakeDots }) => {
  return (
    <div>
      {snakeDots.map(dot => (
        <div
          className="snake-dot"
          key={new Date()}
          style={{left: `${dot[0]}%`, top: `${dot[1]}%`}}
        />
      ))}
    </div>
  )
};

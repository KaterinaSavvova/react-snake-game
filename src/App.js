import React, { useState, useEffect } from 'react';
import { Food } from './components/Food';
import { Snake } from './components/Snake';

const App = () => {
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0]
  ]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState([6, 8]);

  const foodCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random() * (max-min+1)+min)/2)*2;
    setFood([x, y]);
  };

  useEffect(() => {
    setInterval(moveSnake, 200);
    document.onkeydown = onKeyDown;
  });

  useEffect(() => {
    checkingBorders();
    checkingCollapsing();
    checkIfEat();
  }, snakeDots)

  // componentDidMount() {
  //   setInterval(moveSnake, 200);
  //   document.onkeydown = onKeyDown;
  // }

  // componentDidUpdate() {
  //   checkingBorders();
  // checkingCollapsing();
  // checkIfEat()
  // }

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection('UP');
        break;
      case 40:
        setDirection('DOWN');
        break;
      case 37:
        setDirection('LEFT');
        break;
      case 39:
        setDirection('RIGHT');
        break;
    };
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] + 2];
        break;
      case 'DOWN':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots([...snakeDots, dots]);
  };

  const checkingBorders = () => {
    let head = snakeDots[snakeDots.length -1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  };

  const gameOver = () => {
    alert(`Game Over. Snake length is ${snakeDots.length}`);
    setSnakeDots([[0, 0],[2, 0]]);
  };

  const checkingCollapsing = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.includes(head) && gameOver();
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      foodCoordinates();
      getSnakeGrow();
    }
  };

  const getSnakeGrow = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  return (
    <div className="game-area">
      <Snake snakeDots={snakeDots}/>
      <Food dot={food}/>
    </div>
  );
}

export default App;

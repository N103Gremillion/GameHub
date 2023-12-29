const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

let rect_x = 0;
let rect_y = 0;
let rect_width = 100;
let rect_height = 100;

let max_velo = 20;
let min_velo = 10;

let dir_x = 1;
let dir_y = 1;

let vel_x = (Math.random() * 10) + 1;
let vel_y = (Math.random() * 10) + 1;

startGame();

function startGame() {
  setTimeout(() => {
    if (rect_x + rect_width > width || rect_x < 0) {
      vel_x = (Math.random() * max_velo) + min_velo;
            vel_y = (Math.random() * max_velo) + min_velo;
      
      if(rect_x + rect_width > width - rect_width) {
        rect_x = width - rect_width;
      }

      if(rect_x < 0) {
        rect_x = 0;
      }

      dir_x *= -1;
    }

    if (rect_y + rect_height > height || rect_y < 0) {
            vel_x = (Math.random() * max_velo) + min_velo;
      vel_y = (Math.random() * max_velo) + min_velo;


      if(rect_y + rect_height > height - rect_height) {
        rect_y = height - rect_height;
      }

      if(rect_y < 0) {
        rect_y = 0;
      }

      dir_y *= -1;
    }


    rect_x += dir_x * vel_x;
    rect_y += dir_y * vel_y;

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(rect_x, rect_y, rect_width, rect_height);

    console.log("x: " + rect_x);
    console.log("y: " + rect_y);

    start();
  }, 10);
}



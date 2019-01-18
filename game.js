var scene = document.querySelector('a-scene');
var camera = document.querySelector('a-camera');
var cursor = document.querySelector('a-cursor');

var score = 0;
var scoreText = document.createElement('a-text');
scoreText.setAttribute('color', '#f201ca');
scoreText.setAttribute('value', "score " + score);
scoreText.setAttribute('position', '1 0 0');
camera.appendChild(scoreText);

var level = 1;
var boxColors = [];

game();

function game(){

  for(var i = 0; i <= level; i++){

    var cube = document.createElement('a-box');
    var cubeX = Math.floor( Math.random() * 30 );
    var cubeZ = Math.floor( Math.random() * 30 );
    var color = getRandomColor();
    boxColors.push(color);
    cube.setAttribute('color', color);
    cube.setAttribute('position', cubeX + ' 1 ' + cubeZ);
    cube.setAttribute('id', 'b' + i);

    scene.appendChild(cube);

    var anim = document.createElement('a-animation');
    anim.setAttribute('attribute', 'rotation');
    anim.setAttribute('dur', '5000');
    anim.setAttribute('fill', 'forwards');
    anim.setAttribute('to','360 360 360');
    anim.setAttribute('repeat', 'indefinite');

    cube.appendChild(anim);

  }

  check();

}

function check(){

  var ex = document.createElement('a-sphere');
  ex.setAttribute('color', boxColors[0]);
  ex.setAttribute('radius', '0.01');
//  ex.setAttribute('position', '-1.5 1 -1.5');
  cursor.appendChild(ex);

var clis = document.querySelector('a-box');

clis.addEventListener('mouseenter', function () {

  score++;
  var sp = document.querySelector('#' + this.id);
  console.log(this.id);
  sp.parentNode.removeChild(sp);
  boxColors.splice(0, 1);
  scoreText.setAttribute('value', "score " + score);
  if(boxColors.length === 0)
  {
    level++;
    game();
  }
  else{
    check();
  }

});

}

function getRandomColor() {
const letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++ ) {
  color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

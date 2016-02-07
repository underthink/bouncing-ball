import Ball from './model/ball';
import BallElement from './model/ball_dom_thing';


var ball = Ball.createBallWithRandomVelocity(100, 100);
var ballElement = new BallElement(ball);

ballElement.insertDomObject();

document.be = ballElement;

function tick() {
    document.be.tick();
    window.requestAnimationFrame(tick);
}

tick();
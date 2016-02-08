import { Ball } from './model/ball';
import BallElement from './view/ball_element';
import AnimatableUpdater from './animatable_updater';


var animator = new AnimatableUpdater();

// register the event handlers to create a new ball element (and delegate its animation to the AnimatableUpdater)
document.addEventListener('click', (event) => {
    var ball = Ball.createBallWithRandomVelocity(event.clientX, event.clientY);
    var ballElement = new BallElement(ball);

    ballElement.insertDomObject();

    animator.addAnimatable(ballElement);
});

// ...and actually start animation :)
animator.queueNextAnimationFrame();
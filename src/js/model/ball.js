/** How much the Y velocity will be adjusted each tick, to simulate gravity. */
const GRAVITY = 1.0;
/** Max X or Y velocity (abs value) */
const MAX_VELOCITY = 30.0;


// FIXME: Do i mean > ?
/** Return a random float in the range -MAX_VELOCITY > x > MAX_VELOCITY */
function getRandomVelocity() {
    return (Math.random() * MAX_VELOCITY * 2) - MAX_VELOCITY;
}


class Ball {
    /**
     * Creates us a new ball, assuming we know where it'll be created and what it's initial x/y velocities will
     * be.
     *
     * @param initialX {int} - Initial start X position of the ball (left edge)
     * @param initialY {int} - Initial start Y position of the ball (top edge)
     * @param initialDeltaX (float) - Initial X velocity of the ball
     * @param initialDeltaY {float} - Intial Y velocity of the ball
     */
    constructor(initialX, initialY, initialDeltaX, initialDeltaY) {
        this.currentX = initialX;
        this.currentY = initialY;
        this.deltaX = initialDeltaX;
        this.deltaY = initialDeltaY;
    }

    /**
     * Does what it says on the tin :) Creates a new ball object with a random velocity.
     *
     * @param initialX {int} - Initial start X position of the ball (left edge)
     * @param initialY {int} - Initial start Y position of the ball (top edge)
     * @param ballClass - Class object representing a ball
     *
     * @returns {Ball} - New shiny Ball object
     */
    static createBallWithRandomVelocity(initialX, initialY, ballClass=Ball) {
        return new ballClass(initialX, initialY, getRandomVelocity(), getRandomVelocity());
    }

    /**
     * 'Iterate' the position of the ball. This will update the X and Y position, and (possibly) the X and Y
     * velocities.
     *
     * @param frames {number} - The 'amount' of frames to move the ball by. Allows animation scaling.
     * 1.0 is 'normal', 2.0 is 2 frames, etc.
     */
    tick(frames = 1.0) {
        this.currentX += (this.deltaX * frames);
        this.currentY += (this.deltaY * frames);

        this._updateVelocities(frames);
    }

    /** Cause the ball to bounce in the Y direction */
    bounceVertically() {
        this.deltaY *= -1;
    }

    /** Cause the ball to bounce in the X direction */
    bounceHorizontally() {
        this.deltaX *= -1;
    }

    /**
     * Update the velocities, to simulate gravity. Capped at MAX_VELOCITY.
     *
     * @param frames {number} - The 'amount' of frames to update velocities by. Allows animation scaling.
     * 1.0 is 'normal', 2.0 is 2 frames, etc.
     */

    _updateVelocities(frames) {
        this.deltaY += (GRAVITY * frames);

        if (this.deltaY > MAX_VELOCITY) {
            this.deltaY = MAX_VELOCITY;
        }
    }
}


export default Ball;
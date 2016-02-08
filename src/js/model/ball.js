/** How much the Y velocity will be adjusted each tick, to simulate gravity. */
const GRAVITY = 2.0;
/** Max X or Y velocity (abs value) */
const MAX_VELOCITY = 40.0;
/** Amount of velocity that's retained after bouncing */
const VELOCITY_BOUNCE_FRACTION = 0.8;


/** Return a random float in the range -MAX_VELOCITY to MAX_VELOCITY */
function getRandomVelocity() {
    return (Math.random() * MAX_VELOCITY * 2) - MAX_VELOCITY;
}


/**
 * Class to represent the positions and velocities of a ball, acting under gravity.
 */
class Ball {
    /**
     * Creates us a new ball, assuming we know where it'll be created and what it's initial x/y velocities will
     * be.
     *
     * @param initialX {int} - Initial start X position of the ball (left edge)
     * @param initialY {int} - Initial start Y position of the ball (top edge)
     * @param initialDeltaX (number) - Initial X velocity of the ball
     * @param initialDeltaY {number} - Initial Y velocity of the ball
     *
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
     * Check whether the next ball position will be outside the X bounds (typically of the ball's container). Assumes
     * X bounds are 0 - maxWidth.
     *
     * @param frames {number} - Number of frames we're about to animate
     * @param maxWidth {int} - Total width of the container the ball's inside
     *
     * @returns {boolean} - True if the ball will be outside the bounds given
     */
    willBeOutsideHorizontalBounds(frames, maxWidth) {
        var nextXPosition = this._getNextXPosition(frames);

        return (nextXPosition < 0 || nextXPosition > maxWidth);
    }

    /**
     * Check whether the next ball position will be outside the Y bounds (typically of the ball's container). Assumes
     * Y bounds are 0 - maxHeight.
     *
     * @param frames {number} - Number of frames we're about to animate
     * @param maxHeight {int} - Total height of the container the ball's inside
     *
     * @returns {boolean} - True if the ball will be outside the bounds given
     */
    willBeOutsideVerticalBounds(frames, maxHeight) {
        var nextYPosition = this._getNextYPosition(frames);

        return (nextYPosition < 0 || nextYPosition > maxHeight);
    }

    /**
     * 'Iterate' the position of the ball. This will update the X and Y position, and (possibly) the X and Y
     * velocities.
     *
     * @param frames {number} - The 'amount' of frames to move the ball by. Allows animation scaling.
     * 1.0 is 'normal', 2.0 is 2 frames, etc.
     */
    tick(frames = 1.0) {
        this.currentX = this._getNextXPosition(frames);
        this.currentY = this._getNextYPosition(frames);

        this._updateVelocities(frames);
    }

    /** Internal method to get the next X position the ball will be at */
    _getNextXPosition(frames) {
        return this.currentX + (this.deltaX * frames);
    }

    /** Internal method to get the next Y position the ball will be at */
    _getNextYPosition(frames) {
        return this.currentY + (this.deltaY * frames);
    }

    /** Cause the ball to bounce in the Y direction */
    bounceVertically() {
        this.deltaY *= -1 * VELOCITY_BOUNCE_FRACTION;
    }

    /** Cause the ball to bounce in the X direction */
    bounceHorizontally() {
        this.deltaX *= -1 * VELOCITY_BOUNCE_FRACTION;
    }

    /**
     * Update the velocities, to simulate gravity. Capped at MAX_VELOCITY.
     *
     * @param frames {number} - The 'amount' of frames to update velocities by. Allows animation scaling.
     * 1.0 is 'normal', 2.0 is 2 frames, etc.
     */
    _updateVelocities(frames) {
        var yGravityIncrease = (GRAVITY * frames);

        if (this.deltaY + yGravityIncrease > MAX_VELOCITY) {
            this.deltaY = MAX_VELOCITY;
        }
        else {
            this.deltaY += yGravityIncrease;
        }

        if (this.deltaX > MAX_VELOCITY) {
            this.deltaX = MAX_VELOCITY;
        }
    }
}


export { Ball, GRAVITY, MAX_VELOCITY, VELOCITY_BOUNCE_FRACTION };
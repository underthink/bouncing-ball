import { Ball } from './../model/ball';

import { createElement, attendElementToBody, setStylesOnElement,
    elementHeight, elementWidth } from '../util/domutil'

/** Control whether we request the ball bounce when we 'hit' container edges */
const BOUNCE_VERTICALLY = true;
const BOUNCE_HORIZONTALLY = true;

/** Additional padding for the container object */
const PADDING = 10;

/** 'Death' velocity. If our velocity is less that this, we consider the ball dead. */
const DEATH_VELOCITY = 4.0;

/** Create a uninserted Ball DOM object */
var createBallElement = function createBallElement() {
    return createElement('span', {
        'class': 'ball'
    });
};

/**
 * A class that encapsulates the rendering of ball on-screen, by creating and manipulating DOM elements.
 */
export default class BallElement {
    /**
     * Create a new ball element.
     *
     * @param ball The backing Ball object, containing actual ball positions
     */
    constructor(ball) {
        this.ball = ball;
        this.element = createBallElement();

        this.updateElementStyles();

        this.lastVerticalBounceVelocity = null;
    }

    /** Inserts our Ball DOM element in the page */
    insertDomObject() {
        attendElementToBody(this.element);
    }

    /** Removes our Ball DOM object from the page */
    removeDomElement() {
        this.element.parentNode.removeChild(this.element);
    }

    /** Update the CSS styles on our ball object from the Ball's current position */
    updateElementStyles() {
        setStylesOnElement(this.element, {
            'top': (this.ball.currentY - (elementHeight(this.element) / 2)) + 'px',
            'left': (this.ball.currentX - (elementWidth(this.element) / 2)) + 'px'
        })
    }

    /**
     * Updates the Ball object. Part of the Animatables contract.
     *
     * @param frames Number of 'frames' that we need to increment the animation by.
     */
    tick(frames) {
        this._maybeBounce(frames);
        this.ball.tick(frames);
        this.updateElementStyles();
    }

    /** Return True if the ball should be considered dead, and removed from the window */
    isDead() {
        // kill this ball if we didn't bounce very much vertically
        if (this.lastVerticalBounceVelocity != null && this.lastVerticalBounceVelocity < DEATH_VELOCITY) {
            return true;
        }
    }

    /**
     * Get the height of the container (by which we currently mean window)
     *
     * @private
     */
    _getContainerHeight() {
        return window.innerHeight - PADDING;
    }

    /**
     * Get the width of the container (by which we currently mean window)
     *
     * @private
     */
    _getContainerWidth() {
        return window.innerWidth - PADDING;
    }

    /**
     * Potentially bounce the ball if we're about to exit the container bounds.
     *
     * @param frames Number of 'frames' that we need to increment the animation by.
     * @private
     */
    _maybeBounce(frames) {
        if (BOUNCE_HORIZONTALLY && this.ball.willBeOutsideHorizontalBounds(frames, this._getContainerWidth())) {
            this.ball.bounceHorizontally();
        }

        if (BOUNCE_VERTICALLY && this.ball.willBeOutsideVerticalBounds(frames, this._getContainerHeight())) {
            this.lastVerticalBounceVelocity = Math.abs(this.ball.deltaY);
            this.ball.bounceVertically();
        }
    }
}
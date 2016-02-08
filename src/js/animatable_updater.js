const DEFAULT_SPEED = 20;

/**
 * A class that continually requests some animatables update their state.
 *
 * An animatable that can be registered with this class is expected to implement a few methods:
 *
 *  - tick(frames {number}) - update the element every time a new frame happens. frames scales the animation (ie
 *      frames=2 should cause twice the 'updates' to happen)
 *  - isDead() - Should return True if this animatable is dead, and should be removed
 *  - removeDomElement() - Should remove any associated DOM elements from the DOM
 *
 */
export default class AnimatableUpdater {
    /**
     * Create a new (and unstarted) AnimatableUpdater, with no attached animatables.
     *
     * @param speed The speed of the animation. 1 is pretty slow. 20 is a bit more reasonable.
     */
    constructor(speed=DEFAULT_SPEED) {
        this.activeAnimatables = [];
        this.lastFrame = null;
        this.millisPerFrame = 1000.0 / speed;
    }

    /** Callback from the `requestAnimationFrame`, that delegates updating to any registered animatables. */
    handleFrame(frameTs) {
        // figure out how many frames we need to update by (which might be a fraction), and store the ts for future
        // comparisons
        var tsDelta = (frameTs - this.lastFrame);
        if (this.lastFrame == null) {
            tsDelta = 0;
        }
        this.lastFrame = frameTs;

        var framesSinceLastFrame = tsDelta / this.millisPerFrame;

        // cull any elements that believe themselves to be dead
        this._removeDeadElements();

        // request all registered animatables update their state
        this.activeAnimatables.forEach((thing) => thing.tick(framesSinceLastFrame));

        // ...and start again
        this.queueNextAnimationFrame();
    }

    /** Request that the browser let us generate another frame */
    queueNextAnimationFrame() {
        window.requestAnimationFrame(this.handleFrame.bind(this));
    }

    /**
     * Add an animatable to our list of things to update.
     *
     * @param animatable An object that obeys the animatable spec (see class def)
     */
    addAnimatable(animatable) {
        this.activeAnimatables.push(animatable);
    }

    /** Remove any dead elements from our internal list, and give animatables a chance to remove elements */
    _removeDeadElements() {
        this.activeAnimatables.filter((thing) => thing.isDead()).forEach((thing) => thing.removeDomElement());
        this.activeAnimatables = this.activeAnimatables.filter((thing) => !thing.isDead());
    }
}
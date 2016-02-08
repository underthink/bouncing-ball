import { Ball, GRAVITY, MAX_VELOCITY, VELOCITY_BOUNCE_FRACTION } from '../../src/js/model/ball';

describe("Ball model", function() {
    const UNSPECIFIED = 0;


    it("creates a ball with the expected positions and velocities", function() {
        const X_VAL = 1;
        const Y_VAL = 2;
        const X_VELOCITY = 3;
        const Y_VELOCITY = 4;

        var newBall = new Ball(X_VAL, Y_VAL, X_VELOCITY, Y_VELOCITY);

        expect(newBall.currentX).toBe(X_VAL);
        expect(newBall.currentY).toBe(Y_VAL);
        expect(newBall.deltaX).toBe(X_VELOCITY);
        expect(newBall.deltaY).toBe(Y_VELOCITY);
    });

    it("correctly updates x values every tick", function() {
        const X_VAL = 1;
        const X_VELOCITY = 3;

        var newBall = new Ball(X_VAL, UNSPECIFIED, X_VELOCITY, UNSPECIFIED);

        newBall.tick(1);

        expect(newBall.currentX).toBe(4);
        expect(newBall.deltaX).toBe(3);
    });

    it("correctly updates y values every tick", function() {
        const Y_VAL = 1;
        const Y_VELOCITY = 3;

        var newBall = new Ball(UNSPECIFIED, Y_VAL, UNSPECIFIED, Y_VELOCITY);

        newBall.tick(1);

        expect(newBall.currentY).toBe(Y_VAL + Y_VELOCITY);
        expect(newBall.deltaY).toBe(Y_VELOCITY + GRAVITY);
    });

    it("updates and dampens only x velocity on horizontal bounce", function() {
        const X_VELOCITY = 1;
        const Y_VELOCITY = 3;

        var newBall = new Ball(UNSPECIFIED, UNSPECIFIED, X_VELOCITY, Y_VELOCITY);

        newBall.bounceHorizontally();

        expect(newBall.deltaX).toBe(-X_VELOCITY * VELOCITY_BOUNCE_FRACTION);
        expect(newBall.deltaY).toBe(Y_VELOCITY);
    });

    it("updates and dampens only y velocity on vertical bounce", function() {
        const X_VELOCITY = 1;
        const Y_VELOCITY = 3;

        var newBall = new Ball(UNSPECIFIED, UNSPECIFIED, X_VELOCITY, Y_VELOCITY);

        newBall.bounceVertically();

        expect(newBall.deltaX).toBe(X_VELOCITY);
        expect(newBall.deltaY).toBe(-Y_VELOCITY * VELOCITY_BOUNCE_FRACTION);
    });

    it("caps maximum x velocity", function() {
        const X_VAL = 1;
        const X_VELOCITY = 1000;

        var newBall = new Ball(X_VAL, UNSPECIFIED, X_VELOCITY, UNSPECIFIED);

        newBall.tick(1);

        expect(newBall.deltaX).toBe(MAX_VELOCITY);
    });

    it("caps maximum y velocity", function() {
        const Y_VAL = 1;
        const Y_VELOCITY = 1000;

        var newBall = new Ball(Y_VAL, UNSPECIFIED, Y_VELOCITY, UNSPECIFIED);

        newBall.tick(1);

        expect(newBall.deltaX).toBe(MAX_VELOCITY);
    });

    it("gravity cannot push y over max velocity", function() {
        const Y_VAL = 1;
        const Y_VELOCITY = MAX_VELOCITY - (GRAVITY / 2);

        var newBall = new Ball(UNSPECIFIED, Y_VAL, UNSPECIFIED, Y_VELOCITY);

        newBall.tick(1);

        expect(newBall.deltaY).toBe(MAX_VELOCITY);
    });

    it("scales animation with number of frames", function() {
        const X_VAL = 1;
        const Y_VAL = 2;
        const X_VELOCITY = 3;
        const Y_VELOCITY = 4;

        var newBall = new Ball(X_VAL, Y_VAL, X_VELOCITY, Y_VELOCITY);

        newBall.tick(2);

        expect(newBall.currentX).toBe(X_VAL + (2 * X_VELOCITY));
        expect(newBall.currentY).toBe(Y_VAL + (2 * Y_VELOCITY));
        expect(newBall.deltaX).toBe(X_VELOCITY);
        expect(newBall.deltaY).toBe(Y_VELOCITY + (2 * GRAVITY));
    });
});
import AnimatableUpdater from '../src/js/animatable_updater';

describe("Animator class", function() {
    var mockAnimatable;

    beforeEach(function() {
        mockAnimatable = jasmine.createSpyObj('animatable', ['tick', 'isDead', 'removeDomElement']);
    });

    it("allows animatables to be added", function() {
        var updater = new AnimatableUpdater();

        updater.addAnimatable(mockAnimatable);

        expect(updater.activeAnimatables).toContain(mockAnimatable);
    });

    it("correctly removes dead elements", function() {
        mockAnimatable.isDead.and.returnValue(true);

        var updater = new AnimatableUpdater();

        updater.addAnimatable(mockAnimatable);
        updater._removeDeadElements();

        expect(mockAnimatable.isDead).toHaveBeenCalled();
        expect(mockAnimatable.removeDomElement).toHaveBeenCalled();

        expect(updater.activeAnimatables).not.toContain(mockAnimatable);
    });

    it("correctly requests elements animate", function() {
        mockAnimatable.isDead.and.returnValue(false);

        var updater = new AnimatableUpdater();

        spyOn(updater, 'queueNextAnimationFrame');

        updater.addAnimatable(mockAnimatable);
        updater.handleFrame(1);

        expect(mockAnimatable.isDead).toHaveBeenCalled();
        expect(mockAnimatable.tick).toHaveBeenCalledWith(jasmine.any(Number));
        expect(updater.queueNextAnimationFrame).toHaveBeenCalled();

        expect(updater.activeAnimatables).toContain(mockAnimatable);
    });

    it("correctly updates frames based on speed", function() {
        mockAnimatable.isDead.and.returnValue(false);

        var updater = new AnimatableUpdater(1000);

        spyOn(updater, 'queueNextAnimationFrame');

        updater.addAnimatable(mockAnimatable);
        
        updater.handleFrame(1);

        expect(mockAnimatable.tick).toHaveBeenCalledWith(jasmine.any(Number));
        expect(mockAnimatable.isDead).toHaveBeenCalled();
        expect(updater.queueNextAnimationFrame).toHaveBeenCalled();

        updater.handleFrame(3);

        expect(mockAnimatable.tick).toHaveBeenCalledWith(2);
        expect(mockAnimatable.isDead).toHaveBeenCalled();
        expect(updater.queueNextAnimationFrame).toHaveBeenCalled();

        expect(updater.activeAnimatables).toContain(mockAnimatable);
    });
});


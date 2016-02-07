import Ball from './ball';

import { createElement, attendElementToBody, setStylesOnElement } from '../util/domutil'


var createBallElement = function createBallElement() {
    return createElement('span', {
        'class': 'ball'
    });
};

export default class BallElement {
    constructor(ballModel) {
        this.ballModel = ballModel;

        this.element = createBallElement();
        this.elementComputedStyles = window.getComputedStyle(this.element);

        this.updateElementStyles();
    }

    insertDomObject() {
        attendElementToBody(this.element);
    }

    updateElementStyles() {
        setStylesOnElement(this.element, {
            'top': (this.ballModel.currentY - (this.element.offsetHeight / 2)) + 'px',
            'left': (this.ballModel.currentX - (this.element.offsetWidth / 2)) + 'px'
        })
    }

    tick() {
        this.ballModel.tick();
        this.updateElementStyles();
    }
}
/*
 * Various utils for touching the DOM, in lieu of jQuery or the like
 */


/** Iterate over each key/value in an object, iff that property is 'owned' by the object */
function objEach(obj, callable) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }

        callable(key, obj[key]);
    }
}

/** Create a new element of the given type, with the given attributes */
export function createElement(elementType, elementAttrs) {
    var element = document.createElement(elementType);

    objEach(elementAttrs, (attrKey, attrValue) => element.setAttribute(attrKey, attrValue));

    return element;
}

/** Set CSS styles on an element, replacing any existing styles that are set */
export function setStylesOnElement(element, newStyles) {
    objEach(newStyles, (styleKey, styleValue) => element.style[styleKey] = styleValue);
}

/** Append a DOM object to the Body */
export function attendElementToBody(element) {
    document.body.appendChild(element);
}

/** Get the height of an element */
export function elementHeight(element) {
    return element.offsetHeight;
}

/** Get the width of an element */
export function elementWidth(element) {
    return element.offsetWidth;
}


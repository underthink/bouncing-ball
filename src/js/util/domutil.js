/*
 * Various utils for touching the DOM, in lieu of jQuery or the like
 */


function objEach(obj, callable) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }

        callable(key, obj[key]);
    }
}

export function createElement(elementType, elementAttrs) {
    var element = document.createElement(elementType);

    objEach(elementAttrs, (attrKey, attrValue) => element.setAttribute(attrKey, attrValue));

    return element;
}

export function setStylesOnElement(element, newStyles) {
    objEach(newStyles, (styleKey, styleValue) => element.style[styleKey] = styleValue);
}

export function attendElementToBody(element) {
    document.body.appendChild(element);
}
/**
 * This method allow to easily remove a CSS class to any SVG element
 * 
 * The classList parameter is a string of white space separated CSS class name.
 * 
 * Conveniently, this method return the object itself in order to easily chain
 * method call.
 *
 * @param classList string
 */
  
// Testing the existence of the global SVGElement object to safely extend it.
if (SVGElement && SVGElement.prototype) {
    SVGElement.prototype.removeClass = function removeClass(classList) {
        "use strict";

        // Because the className property can be animated through SVG, we have to reach
        // the baseVal property of the className SVGAnimatedString object.
        var currentClass = this.className.baseVal;

        // Note that all browsers which currently support SVG also support Array.forEach()
        classList.split(' ').forEach(function (newClass) {
            var tester = new RegExp(' *\\b' + newClass + '\\b *', 'g');

            currentClass = currentClass.replace(tester, ' ');
        });

        // The SVG className property is a readonly property so 
        // we must use the regular DOM API to write our new classes.
        // Note that all browsers which currently support SVG also support String.trim()
        this.setAttribute('class', currentClass.trim());

        return this;
    };
}
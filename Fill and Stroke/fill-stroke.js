/**
 * Make an easy access to any fill and stroke property for shapes
 * So instead of doing myObject.getAttribute(myProperty) or
 * myObject.style.myProperty you simply do = myObject.myProperty
 */
(function (window) {
    "use strict";

    var shapes = [
        window.SVGPathElement     || null,
        window.SVGRectElement     || null, 
        window.SVGCircleElement   || null, 
        window.SVGEllipseElement  || null,
        window.SVGLineElement     || null, 
        window.SVGPolylineElement || null,
        window.SVGPolygonElement  || null,
        window.SVGTextElement     || null,
        window.SVGTSpanElement    || null,
        window.SVGTRefElement     || null,
        window.SVGTextPathElement || null,
        window.SVGAltGlyphElement || null
    ]

    var properties = [
        "fill", "fillOpacity", "fillRule", 
        "stroke", "strokeWidth", "strokeDasharray", "strokeDashoffset", 
        "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity" 
    ]

    shapes.forEach(function (obj) {
        if(obj === null) return;

        properties.forEach(function (prop) {
            Object.defineProperty(obj.prototype, prop, {
                get: function get() {
                    var attribute = this.getAttribute(prop);
                    var property  = this.style[prop];

                    if(property)  return property;
                    if(attribute) return attribute;

                    return "";
                },
                set: function set(value) {
                    this.style[prop] = value;
                },
                configurable: false,
                enumerable: true
            });
        });
    });
})(this);
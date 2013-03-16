/**
 * This is a rough implementation of innerHTML for SVG
 *
 * It should have been called innerSVG but there is a proposition in DOM4
 * to push innerHTML on the Element interface with the name innerHTML to 
 * all language. This implementation follow that line.
 *
 * That said, it's important to note that innerHTML on SVGElement only accept
 * SVG content. You cannot use it to push HTML content into SVG. To do this you
 * must use the SVG foreignObject tag. However, remember that IE10 does not 
 * support foreignObject.
 */
if (typeof SVGElement !== 'undefined' && SVGElement.prototype && typeof SVGElement.prototype.innerHTML === 'undefined') {
  (function () {
    "use strict";

    var serializer = new XMLSerializer(),
        parser     = new DOMParser();

    Object.defineProperty(SVGElement.prototype, 'innerHTML', {
      get : function(){
        if (this.childNodes.length === 0) { return ""; }

        var outer = serializer.serializeToString(this),
          start = outer.indexOf('>') + 1,
          end   = outer.lastIndexOf('<');

        return outer.substring(start, end);
      },

      set : function(src){
        while (this.firstChild) { this.removeChild(this.firstChild); }

        if (typeof src === 'string' && src !== "") {
          src  = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + src + '</svg>';
          var node = parser.parseFromString(src, "application/xml").firstChild;

          if (node.tagName !== 'svg') {
            throw new Error('This is not a valid SVG string');
          }

          while (node.firstChild) { this.appendChild(node.firstChild); }
        }
      },

      enumerable : true,
      configurable : false
    });
  })();
}
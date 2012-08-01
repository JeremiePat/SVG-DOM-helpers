(function () {
    "use strict";

    // Param name must star with a letter or the _ symbole
    // then can be followed by any letters, numbers or _ symbole
    function isValidParamName(name) {
        return name.search(/^[a-z_]+[0-9a-z_]*$/i) > -1;
    }

    // Color must be 6 hexa digit
    //
    // FIXME : Add more color format
    function isValidColor(color) {
        return color.search(/^[0-9a-f]{6}$/i) > -1;
    }

    // Push a color to the DOM
    function setColor(elements, attribute, color) {
        Array.prototype.forEach.call(document.querySelectorAll(elements), function (element) {
            element.setAttribute(attribute, "#" + color);
        });
    }

    // Map a single color with DOM objects
    function mapColor(name, ele, attr) {
        attr = ((attr === "fill" || attr === "stroke") && attr) || "fill";

        if (isValidParamName(name)) {
            if (!this[name]) {
                this[name] = {};
            }

            this[name].map = {
                elements: ele,
                attribute: attr
            };
        }

        if (this[name].value && this[name].map && this[name].map.elements && this[name].map.attribute) {
            setColor(this[name].map.elements, this[name].map.attribute, this[name].value);
        }
    }

    // The CustomColor object structure is :
    // CustomColor {
    //     colorname : {
    //         map : {
    //             elements : string
    //             attribute : "fill|stroke"
    //         } 
    //         value : string 
    //     }
    // 
    //     add (name, value)
    //     map (name, elements, attribute = fill)
    //     remove (name)
    // }
    function CustomColor() {
        var that = this;

        window.location
              .search
              .substr(1)
              .split('&')
              .forEach(function (item) {
                  var param = item.split("=");

                  CustomColor.prototype.add.call(that, param[0], param[1]);
              });
    }

    // Define or update a custom color
    CustomColor.prototype.add = function add(name, value) {
        if (isValidParamName(name) && isValidColor(value)) {
            if (!this[name]) {
                this[name] = {};
            }

            this[name].value = value;
        }

        if (this[name] && this[name].value && this[name].map && this[name].map.elements && this[name].map.attribute) {
            setColor(this[name].map.elements, this[name].map.attribute, this[name].value);
        }

        return this;
    };

    // Map a custome color name with DOM elements and attributes
    //
    // FIXME : When .map is call before DOMReady, it should be defer until then.
    CustomColor.prototype.map = function map () {
        var that = this;
        // This method can be call for a single color
        if (arguments.length === 3) {
            mapColor.call(that, arguments[0], arguments[1], arguments[2]);

        // This method can also be called with a map Array
        // A map object must have the following structure :
        // map = {
        //     name: {
        //         elements : string
        //         attribute : "fill|stroke"
        //     }+
        // }
        } else if (arguments.length === 1) {
            for (var name in arguments[0]) {
                mapColor.call(that, name, arguments[0][name].elements, arguments[0][name].attribute);
            }
        } else {
            throw "Unexpected arguments list";
        }

        return this;
    };

    // Delete a custom color
    //
    // FIXME : Allow to retain default color for targed elements in order to restor it
    CustomColor.prototype.removeColor = function removeColor(name) {
        if(this[name]){
            if (this[name].map && this[name].map.elements && this[name].map.attribute) {
                setColor(this[name].elements, this[name].attribute, '000');
            }
    
            delete this[name];
        }

        return this;
    };

    window.CustomColor = new CustomColor();
})();
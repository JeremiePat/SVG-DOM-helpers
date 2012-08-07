# Fill and Stroke

This add fill and strokes properties to relevant DOM object. They are shorthand 
to read and write equivalente properties (or attributes if they are not set as 
properties).

## How it works

### Old fashion way

```javascript
var myRect = document.getElementsByTagName("rect")[0];

var fill = myRect.style.fill

if(!fill) {
    fill = myRect.getAttribute("fill");
}

console.log("this rectangle is painted in: "+fill);

myRect.style.fill = "#090";
myRect.setAttribute("fill-opacity", .5);
```

### New way

```javascript
var myRect = document.getElementsByTagName("rect")[0];

console.log("this rectangle is painted in: "+ myRect.fill);

myRect.fill = "#090";
myRect.fillOpacity = .5;
```

## Supported properties

Note that properties with a "-" are supported with the regular CSS OM 
CamelCase notation

* fill
* fill-opacity
* fill-rule

* stroke
* stroke-width
* stroke-dasharray
* stroke-dashoffset
* stroke-linecap
* stroke-linejoin
* stroke-miterlimit
* stroke-opacity
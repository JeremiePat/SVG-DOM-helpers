# CustomColor

CustomColor is a simple script that allow you to push custom color define through URL parameters inside an SVG document

## How it works

In your HTML file :

```html
<object data="myDoc.svg?myMainColor=990000&mySecondaryColor=663333" 
        type="image/svg+xml"></object>
```

In your SVG file :

```xml
<svg xmlns="http://www.w3.org/2000/svg" 
     width="100px" height="100px">

    <circle cx="50" cy="50" r="40" />

<script xlink:href="customcolor.js"></script>
<script>
CustomColor.map({
    myMainColor: {
        elements : "circle"
    },
    mySecondaryColor : {
        elements : "circle",
        attribute: "stroke"
    }
});
</script>
</svg>
```
# Everything Location API wrapper
Easily integrate the EverythingLocation API into your Node.js app

Very simple to use wrapper for www.everythinglocation.com

Installation:
```JAVASCRIPT
npm install everythinglocation
```

Usage:
```JAVASCRIPT
const everythinglocation = require('everythinglocation')
let el = new everythinglocation.EverythingLocation('insertapikeyhere')

el.verify({input:[{Address:'999 Baker Way San Mateo CA USA'}]}, (result) => {
  console.log(JSON.stringify(result))
})
```

Supported fields and how to format query object: https://www.everythinglocation.com/resources/api/
Better simplification of fields etc. to be added soon.

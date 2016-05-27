# Everything Location API wrapper
Easily integrate the EverythingLocation API into your Node.js app

Very simple to use wrapper for www.everythinglocation.com

Not in NPM yet, still work in progress. 

If you want to manually include it as a dependency: 

```JSON
"everythinglocation": "git://github.com/timothykibler/elwrapper.git"
```

Then include it
```JAVASCRIPT
var el = require('everythinglocation');
```

Verify an address: 
```JAVASCRIPT
var params = {
  lqtkey: 'keystring',
  Address: 'address on one line',
  Country: 'ISO or country name'
};

el.verify(params, function(result) {
  //do something with result
});
```

Supported fields: http://www2.everythinglocation.com/support/api/#!/post-address-verify
Better simplification of fields etc. to be added soon. 

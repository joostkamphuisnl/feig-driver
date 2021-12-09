# Feig ID CPR74 Javascript driver

Still under construction.

## Example code

```js
const Reader = require('feig-driver')

// Instantiate a new Reader instance.
const reader = new Reader({
    vendorId: 2737,
    productId: 4,
    // debug: true
})

// Connect to the USB device.
reader.connect().then(() => {

    // Request the current inventory, returns a promise with all found tag ID's.
    reader.inventory().then(foundTags => {
        console.log('Tags:', foundTags)
    })

})
```
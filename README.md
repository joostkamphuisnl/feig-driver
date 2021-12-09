# Feig Electronic OBID classic-pro Javascript driver

Javascript driver to communicate with the OBID classic-pro interface by Feig Electronic GmbH.

> Concept based on the C# library [Amarok79/InlayTester.Drivers.FeigReader](https://github.com/Amarok79/InlayTester.Drivers.FeigReader)

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
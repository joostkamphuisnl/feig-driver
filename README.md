# Feig Electronic OBID classic-pro RFID Javascript driver

Javascript driver to communicate with the OBID classic-pro RFID interface by Feig Electronic GmbH.

> Concept based on the C# library [Amarok79/InlayTester.Drivers.FeigReader](https://github.com/Amarok79/InlayTester.Drivers.FeigReader)

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

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the npm registry.

Before installing, download and install Node.js. Node.js 8.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
```
npm install feig-driver
```

## Hardware support

Tested models

- ID CPR74

Supported transponders

- ISO15693

## Contributing

Feel free to change the code and add support for other models / transponders.
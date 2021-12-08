const Reader = require("./index")

const reader = new Reader({
    debug: true,
})

reader.connect ().then(() => {

    reader.inventory().then(tags => {

        if (tags.length > 0) {
            
            console.log('Received tags:', tags)

        }

    }).catch(result => {

        console.log('Error:', result)
        
    })

    setTimeout(() => {
        reader._handleData(Buffer.from([0x11, 0x00, 0xb0, 0x00, 0x01, 0x03, 0x00, 0xe0, 0x04, 0x01, 0x50, 0xa0, 0x5f, 0x02, 0xb7, 0xd7, 0xbe]))
    }, 3000)

}).catch(error => {
    console.log(error)
})
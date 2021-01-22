# node-lpr
A line printer remote library for Node.js

## Installation

Installation uses the [npm](http://npmjs.org/) package manager.  Just type the following command after installing npm.

    npm install node-lpr

## Example

```javascript
var lpr = require('node-lpr');

var content = Buffer.from('content to print');

var printer = new lpr({
    ip: 'my.ip.v4.address',
    port: 515,
    queue: 'raw',
    debug: console.log
});

printer.connect(function (err) {
    if (err) {
        return console.log(err);
    }
    var job = printer.createJob({
        name: "my job",
        data: content
    });
    job.send(function (err) {
        if (err) {
            console.log(err);
        }
        printer.disconnect();
    });
});
```

## License

node-lpr is available under the MIT license.

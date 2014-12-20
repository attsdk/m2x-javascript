# AT&T's M2X Javascript Client

[AT&T’s M2X](https://m2x.att.com/) is a cloud-based fully managed data storage service for network connected machine-to-machine (M2M) devices. From trucks and turbines to vending machines and freight containers, M2X enables the devices that power your business to connect and share valuable data.

This library aims to provide a simple wrapper to interact with [AT&T M2X API](https://m2x.att.com/developer/documentation/overview). Refer to the [Glossary of Terms](https://m2x.att.com/developer/documentation/glossary) to understand the nomenclature used through this documentation.


Getting Started
==========================
1. Signup for an [M2X Account](https://m2x.att.com/signup).
2. Obtain your _Master Key_ from the Master Keys tab of your [Account Settings](https://m2x.att.com/account) screen.
2. Create your first [Device](https://m2x.att.com/devices) and copy its _Device ID_.
3. Review the [M2X API Documentation](https://m2x.att.com/developer/documentation/overview).

## Compatibility ##

Currently, the M2X Javascript client is supported on all modern browsers except IE8 and IE9.

## Usage ##

### M2X Class ###

The main object encapsulating all API functionality is the global variable ``M2X``.
In order to create a M2X object you will need an API key, which can be either a Master Key or a key belonging to a specific device (in which case you will only be allowed to read/write to this device).

The following is a short example on how to instantiate an M2X object:

```javascript
var m2x = new M2X("<API-KEY>");
```

The M2X object also provides a simple method for checking the API status (so if you are having connectivity issues, you can check whether the API is currently down):

```javascript
m2x.status(function(status) {
    console.log(status);
});
```

An M2X object provides methods for communicating with the remote API. Methods are organized under the following modules: `keys`, `devices`, `charts` and `distributions`.

- [Distributions](src/distributions.js)
  ```javascript
  m2x.distributions.view("<DISTRIBUTION-ID>", function(distribution) {
      console.log(distribution);
  });

  m2x.distributions.list(function(distributions) {
      console.log(distributions);
  });
  ```

- [Devices](src/devices.js)
  ```javascript
  m2x.devices.view("<DEVICE-ID>", function(device) {
      console.log(device);
  });

  m2x.devices.list(function(devices) {
      console.log(devices);
  });
  ```

- [Keys](src/keys.js)
  ```javascript
  m2x.keys.view("<KEY-TOKEN>", function(key) {
      console.log(key);
  });

  m2x.keys.list(function(keys) {
      console.log(keys);
  });
  ```

Refer to the documentation on each class for further usage instructions.


## Versioning

This library aims to adhere to [Semantic Versioning 2.0.0](http://semver.org/). As a summary, given a version number `MAJOR.MINOR.PATCH`:

1. `MAJOR` will increment when backwards-incompatible changes are introduced to the client.
2. `MINOR` will increment when backwards-compatible functionality is added.
3. `PATCH` will increment with backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the `MAJOR.MINOR.PATCH` format.

**Note**: the client version does not necessarily reflect the version used in the AT&T M2X API.


## Example ##

There's an example included in the ``examples/`` directory.


## Building from Source Code ##

The source code for this library is located in the ``src/`` directory. For better organization and loading of modules we use the AMD API. Using a small replacement of [require.js](http://requirejs.org/) called [almond](https://github.com/jrburke/almond) the source is then build into a single distributable file (non-AMD) to make distribution and usage easier.

In order to build this library you will need two things (almond comes included in this repo inside the ``dist/``directory):

* [node.js](http://nodejs.org/)
* [require.js](http://requirejs.org/) (`npm install -g requirejs`)

Once you have these installed go to the ``dist/`` directory and run `./build.sh` (make sure the script has execute permissions). If everything goes well you should now have a minified file named `m2x-VERSION.min.js` file and a non-minified version named `m2x-VERSION.js` in the library's root directory.


## Common Errors ##

If you need help handling errors within the required libraries, please check out these helpful resources:
* require.js common errors: http://requirejs.org/docs/errors.html
* node.js debugging: http://nodejs.org/api/debugger.html
* almond common errors: https://github.com/jrburke/almond#common-errors

## License ##

This gem is delivered under the MIT license. See [LICENSE](LICENSE) for the terms.


## Acknowledgements ##

This client is a direct port of Leandro Lopez' [AT&T M2X client for Ruby](https://github.com/attm2x/m2x-ruby) so all the credit should go to him.

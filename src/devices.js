define(["helpers"], function(helpers) {
    // Wrapper for AT&T M2X Device API
    //
    // See https://m2x.att.com/developer/documentation/device for AT&T M2X
    // HTTP Device API documentation.
    var Devices = function(client, keysAPI) {
        this.client = client;
        this.keysAPI = keysAPI;
    };

    // List/search the catalog of public devices
    //
    // The list of devices can be filtered by using one or more of the
    // following optional parameters:
    //
    // * `q` text to search, matching the name and description.
    // * `page` the specific results page, starting by 1.
    // * `limit` how many results per page.
    // * `groups` a comma separated list of groups.
    // * `modified_since` an ISO8601 timestamp, devices modified since this
    //                    parameter will be included.
    // * `unmodified_since` an ISO8601 timestamp, devices modified before
    //                      this parameter will be included.
    // * `latitude` and `longitude` for searching devices geographically.
    // * `distance` numeric value in `distance_unit`.
    // * `distance_unit` either `miles`, `mi` or `km`.
    Devices.prototype.catalog = function(params, cb) {
        return this.client.get("/devices/catalog", { qs: params || {} }, cb);
    };

    // List/search all the devices that belong to the user associated
    // with the M2X API key supplied when initializing M2X
    //
    // The list of devices can be filtered by using one or more of the
    // following optional parameters:
    //
    // * `q` text to search, matching the name and description.
    // * `page` the specific results page, starting by 1.
    // * `limit` how many results per page.
    // * `groups` a comma separated list of groups.
    // * `visibility` either "public" or "private".
    // * `modified_since` an ISO8601 timestamp, devices modified since this
    //                    parameter will be included.
    // * `unmodified_since` an ISO8601 timestamp, devices modified before
    //                      this parameter will be included.
    // * `latitude` and `longitude` for searching devices geographically.
    // * `distance` numeric value in `distance_unit`.
    // * `distance_unit` either `miles`, `mi` or `km`.
    Devices.prototype.search = function(params, cb) {
        return this.client.get("/devices", { qs: params || {} }, cb);
    };

    // List all the devices that belong to the user associated with the
    // M2X API key supplied when initializing M2X
    Devices.prototype.list = function(cb) {
        return this.search({}, cb);
    };

    // List the user devices groups
    Devices.prototype.groups = function(cb) {
        return this.client.get("/devices/groups", cb);
    };

    // Create a new device
    //
    // Accepts the following parameters as members of a hash:
    //
    // * `name` the device name
    // * `description` a device description (optional).
    // * `visibility` either "public" or "private".
    // * `groups` a comma separated list of decive groups names (optional).
    Devices.prototype.create = function(params, cb) {
        return this.client.post("/devices", params, cb);
    };

    // Update a device
    //
    // Accepts the following parameters as members of a hash:
    //
    // * `name` the device name
    // * `description` a device description (optional).
    // * `visibility` either "public" or "private".
    // * `groups` a comma separated list of decive groups names (optional).
    Devices.prototype.update = function(id, params, cb) {
        return this.client.put( helpers.url("/devices/{0}", id), {
            headers: { "Content-Type": "application/json" },
            params: params
        }, cb);
    };

    // Return the details of the supplied device
    Devices.prototype.view = function(id, cb) {
        return this.client.get(helpers.url("/devices/{0}", id), cb);
    };

    // Return the current location of the supplied device
    //
    // Note that this method can return an empty value (response status
    // of 204) if the device has no location defined.
    Devices.prototype.location = function(id, cb) {
        return this.client.get(helpers.url("/devices/{0}/location", id), cb);
    };

    // Update the current location of the device
    //
    // Accepts the following parameters as members of a hash:
    //
    // * `name` the location name (optional).
    // * `latitude` location latitude.
    // * `longitude` location longitude.
    // * `elevation` location elevation.
    // * `timestamp` ISO 8601 timestamp (optional, defaults to server current time).
    Devices.prototype.updateLocation = function(id, params, cb) {
        return this.client.put(
            helpers.url("/devices/{0}/location", id),
            { params: params },
            cb
        );
    };

    // Return a list of the associated streams for the supplied device
    Devices.prototype.streams = function(id, cb) {
        return this.client.get(helpers.url("/devices/{0}/streams", id), cb);
    };

    // Update stream's properties
    //
    // If the stream doesn't exist it will create it. See
    // https://m2x.att.com/developer/documentation/device#Create-Update-Data-Stream
    // for details.
    //
    // Accepts the following parameters as members of a hash:
    //
    // * `name` the location name (optional).
    // * `latitude` location latitude.
    // * `longitude` location longitude.
    // * `elevation` location elevation.
    // * `timestamp` ISO 8601 timestamp (optional, defaults to server current time).
    Devices.prototype.updateStream = function(id, name, params, cb) {
        return this.client.put(
            helpers.url("/devices/{0}/streams/{1}", id, name),
            { params: params },
            cb
        );
    };

    // Set the stream value
    //
    // Accepts the following parameters as members of a hash:
    //
    // * `value` the stream value
    // * `timestamp` (optional, defaults to server current time).
    Devices.prototype.setStreamValue = function(id, name, params, cb) {
        return this.client.put(
            helpers.url("/devices/{0}/streams/{1}/value", id, name),
            { params: params },
            cb
        );
    };

    // Return the details of the supplied stream
    Devices.prototype.stream = function(id, name, cb) {
        return this.client.get(
            helpers.url("/devices/{0}/streams/{1}", id, name),
            cb
        );
    };

    // List values from an existing data stream associated with a
    // specific device, sorted in reverse chronological order (most
    // recent values first).
    //
    // The values can be filtered by using one or more of the following
    // optional parameters:
    //
    // * `start` an ISO 8601 timestamp specifying the start of the date
    //           range to be considered (optional).
    // * `end` an ISO 8601 timestamp specifying the end of the date
    //         range to be considered (optional).
    // * `min` return only values greater or equal to this value.
    // * `max` return only values lesser or equal to this value.
    // * `limit` maximum number of values to return.
    Devices.prototype.streamValues = function(id, name, params, cb) {
        var url = helpers.url("/devices/{0}/streams/{1}/values", id, name);

        if (typeof params === "function") {
            cb = params;
            params = {};
        }

        return this.client.get(url, { qs: params }, cb);
    };

    // Sample values from an existing stream
    //
    // The values can be filtered by using one or more of the following
    // parameters:
    //
    // * `interval`
    // * `type` can be: "nth", "min", "max", "count", "avg", "sum". (optional,
    //          defaults to "avg").
    // * `start` an ISO 8601 timestamp specifying the start of the date
    //           range to be considered (optional).
    // * `end` an ISO 8601 timestamp specifying the end of the date
    //         range to be considered (optional).
    // * `min` return only values greater or equal to this value.
    // * `max` return only values lesser or equal to this value.
    // * `limit` maximum number of values to return.
    Devices.prototype.sampleStreamValues = function(id, name, params, cb) {
        return this.client.get(
            helpers.url("/devices/{0}/streams/{1}/sampling", id, name),
            { qs: params },
            cb
        );
    };

    // Return the stream stats
    //
    // The stats can be filtered by using one or more of the following
    // parameters:
    //
    // * `start` an ISO 8601 timestamp specifying the start of the date
    //           range to be considered (optional).
    // * `end` an ISO 8601 timestamp specifying the end of the date
    //         range to be considered (optional).
    // * `min` return only values greater or equal to this value.
    // * `max` return only values lesser or equal to this value.
    Devices.prototype.streamStats = function(id, name, params, cb) {
        return this.client.get(
            helpers.url("/devices/{0}/streams/{1}/stats", id, name),
            { qs: params },
            cb
        );
    };

    // Post timestamped values to an existing stream
    //
    // See setStreamValue documentation on how to format values
    Devices.prototype.postValues = function(id, name, values, cb) {
        return this.client.post(
            helpers.url("/devices/{0}/streams/{1}/values", id, name),
            { params: { values: values } },
            cb
        );
    };

    // Delete values from a stream by a date range
    //
    // * `from` ISO 8601 timestamp
    // * `end` ISO 8601 timestamp
    Devices.prototype.deleteStreamValues = function(id, name, params, cb) {
        return this.del(
            helpers.url("/devices/{0}/streams/{1}/values", id, name),
            { params: params },
            cb
        );
    };

    // Delete the stream (and all its values) from the device
    Devices.prototype.deleteStream = function(id, name, cb) {
        return this.client.del(helpers.url("/devices/{0}/streams/{1}", id, name), cb);
    };

    // Post multiple values to multiple streams
    //
    // This method allows posting multiple values to multiple streams
    // belonging to a device. All the streams should be created before
    // posting values using this method. The `values` parameters is a
    // hash with the following format:
    //
    //   {
    //     "stream-name-1": [
    //       { "timestamp": <Time in ISO8601>, "value": x },
    //       { "value": y }
    //     ],
    //     "stream-name-2": [ ... ]
    //   }
    //
    // If the `at` attribute is missing the the current time of the
    // server, in UTC, will be used.
    Devices.prototype.postMultiple = function(id, values, cb) {
        return this.client.post(helpers.url("/devices/{0}/updates", id), {
            headers: { "Content-Type": "application/json" },
            params: { values: values }
        }, cb);
    };

    // Retrieve list of triggers associated with the specified device.
    Devices.prototype.triggers = function(id, cb) {
        return this.client.get(helpers.url("/devices/{0}/triggers", id), cb);
    };

    // Create a new trigger associated with the specified device.
    Devices.prototype.createTrigger = function(id, params, cb) {
        return this.client.post(helpers.url("/devices/{0}/triggers", id), {
            params: params
        }, cb);
    };

    // Get details of a specific trigger associated with an existing device.
    Devices.prototype.trigger = function(id, triggerID, cb) {
        return this.client.get(
            helpers.url("/devices/{0}/triggers/{1}", id, triggerID),
            cb
        );
    };

    // Update an existing trigger associated with the specified device.
    Devices.prototype.updateTrigger = function(id, triggerID, params, cb) {
        return this.client.put(
            helpers.url("/devices/{0}/triggers/{1}", id, triggerID),
            { params: params },
            cb
        );
    };

    // Test the specified trigger by firing it with a fake value.
    // This method can be used by developers of client applications
    // to test the way their apps receive and handle M2X notifications.
    Devices.prototype.testTrigger = function(id, triggerName, cb) {
        return this.client.post(
            helpers.url("/devices/{0}/triggers/{1}", id, triggerName),
            cb
        );
    };

    // Delete an existing trigger associated with a specific device.
    Devices.prototype.deleteTrigger = function(id, triggerID, cb) {
        return this.client.del(
            helpers.url("/devices/{0}/triggers/{1}", id, triggerID),
            cb
        );
    };

    // Return a list of access log to the supplied device
    Devices.prototype.log = function(id, cb) {
        return this.client.get(helpers.url("/devices/{0}/log", id), cb);
    };

    // Delete an existing device
    Devices.prototype.deleteDevice = function(id, cb) {
      return this.del(helpers.url("/devices/{0}", id), cb);
    };

    // Returns a list of API keys associated with the device
    Devices.prototype.keys = function(id, cb) {
        return this.client.get("/keys", { qs: { device: id } }, cb);
    };

    // Creates a new API key associated to the device
    //
    // If a parameter named `stream` is supplied with a stream name, it
    // will create an API key associated with that stream only.
    Devices.prototype.createKey = function(id, params, cb) {
        this.keysAPI.create(helpers.extend(params, { device: id }), cb);
    };

    // Updates an API key properties
    Devices.prototype.updateKey = function(id, key, params, cb) {
        this.keysAPI.update(key, helpers.extend(params, { device: id }), cb);
    };

    return Devices;
});

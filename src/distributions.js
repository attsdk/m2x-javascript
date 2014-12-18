define(["helpers"], function(helpers) {
    // Wrapper for AT&T M2X Distribution API
    //
    // See https://m2x.att.com/developer/documentation/device for AT&T M2X
    // HTTP Distribution API documentation.
    var Distributions = function(client) {
        this.client = client;
    };

    // Retrieve a list of device distributions
    Distributions.prototype.list = function(params, cb) {
        return this.client.get("/distributions", { qs: params || {} }, cb);
    };

    // Create a new device distribution
    //
    // Accepts the following parameters:
    //
    // * `name` the device distribution name.
    // * `description` the device distribution description (optional).
    // * `visibility` either "public" or "private".
    // * `base_device` the id of the device to be used as the device template
    //                 for this distribution.
    Distributions.prototype.create = function(params, cb) {
        return this.client.post("/distributions", { params: params }, cb);
    };


    // Retrieve information about an existing device distribution
    Distributions.prototype.view = function(id, cb) {
        return this.client.get(helpers.url("/distributions/{0}", id), cb);
    };

    // Update an existing device distribution
    //
    // Accepts the following parameters:
    //
    // * `name` device distribution name.
    // * `description` a description for the device distribution.
    // * `visibility` either "public" or "private".
    Distributions.prototype.update = function(id, params, cb) {
        return this.client.put(
            helpers.url("/distributions/{0}", id),
            { params: params },
            cb
        );
    };


    // Retrieve a list of devices added to the a device distribution
    Distributions.prototype.devices = function(id, cb) {
        return this.client.get(
            helpers.url("/distributions/{0}/devices", id),
            cb
        );
    };

    // Add a new device to an existing device distribution
    Distributions.prototype.addDevice = function(id, serial, cb) {
        return this.client.post(helpers.url("/distributions/{0}/devices", id), {
            headers: { "Content-Type": "application/json" },
            params: { serial: serial }
        }, cb);
    };

    // Delete an existing device distribution
    Distributions.prototype.deleteDistribution = function(id, cb) {
        return this.client.del(helpers.url("/distributions/{0}", id), cb);
    };

    // Retrieve a list of data streams associated with the distribution
    Distributions.prototype.dataStreams = function(id, cb) {
        return this.client.get(
            helpers.url("/distributions/{0}/streams", id),
            cb
        );
    };

    // Create/Update a data stream associated with the distribution
    //
    // Accepts the following parametrs:
    //
    // * `unit` the unit used to measure the stream values.
    // * `type` the stream type, either "numeric" or "alphanumeric", only
    //          for new streams (optional, "numeric" by default).
    Distributions.prototype.updateDataStream = function(id, name, params, cb) {
        return this.client.put(
            helpers.url("/distributions/{0}/streams/{1}", id, name),
            {
                headers: { "Content-Type": "application/json" },
                params: params
            },
            cb
        );
    };


    // View information about a stream associated to the distribution
    Distributions.prototype.dataStream = function(id, name, cb) {
        return this.client.get(
            helpers.url("/distributions/{0}/streams/{1}", id, name),
            cb
        );
    };

    // Delete an existing data stream associated to distribution
    Distributions.prototype.deleteDataStream = function(id, name, cb) {
        return this.client.del(
            helpers.url("/distributions/{0}/streams/{1}", id, name),
            cb
        );
    };

    // Retrieve list of triggers associated with the distribution
    Distributions.prototype.triggers = function(id, cb) {
        return this.client.get(
            helpers.url("/distributions/{0}/triggers", id),
            cb
        );
    };

    // Create a new trigger associated with the distribution
    Distributions.prototype.createTrigger = function(id, params, cb) {
        return this.client.post(
            helpers.url("/distributions/{0}/triggers", id),
            { params: params },
            cb
        );
    };

    // Retrieve information about a trigger associated to a distribution
    Distributions.prototype.trigger = function(id, triggerId, cb) {
        return this.client.get(
            helpers.url("/distributions/{0}/triggers/{1}", id, triggerId),
            cb
        );
    };

    // Update an existing trigger associated with the distribution
    Distributions.prototype.updateTrigger = function(id, triggerId, params, cb) {
        return this.client.put(
            helpers.url("/distributions/{0}/triggers/{1}", id, triggerId),
            { params: params },
            cb
        );
    };

    // Test a trigger by firing a fake value
    Distributions.prototype.testTrigger = function(id, triggerId, cb) {
        return this.client.post(
            helpers.url("/distributions/{0}/triggers/{1}/test", id, triggerId),
            { params: params },
            cb
        );
    };

    // Delete a trigger associated to the distribution
    Distributions.prototype.deleteTrigger = function(id, triggerId, cb) {
        return this.client.del(
            helpers.url("/distributions/{0}/triggers/{1}", id, triggerId),
            cb
        );
    };

    return Distributions;
});

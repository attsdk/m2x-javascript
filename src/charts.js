define(["helpers"], function(helpers) {

    // Wrapper for AT&T M2X Charts API
    //
    // See https://m2x.att.com/developer/documentation/charts for AT&T M2X
    // HTTP Charts API documentation.
    var Charts = function(client) {
        this.client = client;
    };

    // Retrieve a list of charts that belongs to the user
    //
    // Accepts the following parameters:
    //
    // * `device` a device id to filter charts by.
    Charts.prototype.list = function(cb) {
        return this.client.get("/charts", cb);
    };

    // Create a new chart
    //
    // Requires the following parameters:
    //
    // * `name` the chart name.
    // * `series` an array containing the device ids and stream names, in
    //            the following format:
    //            [
    //                { device: "<device id>", stream: "<stream name>" },
    //                { device: "<device id>", stream: "<stream name>" }
    //            ]
    Charts.prototype.create = function(params, cb) {
        return this.client.post("/charts", { params: params }, cb);
    };

    // Get details of a chart
    Charts.prototype.view = function(id, cb) {
        return this.client.get(helpers.url("/charts/{0}", id), cb);
    };

    // Update an existing chart
    //
    // See `create` for parameters.
    Charts.prototype.update = function(id, params, cb) {
        return this.client.put(
            helpers.url("/charts/{0}", id),
            { params: params },
            cb
        );
    };

    // Delete an existing chart
    Charts.prototype.deleteChart = function(id, cb) {
        return this.client.del(helpers.url("/charts/{0}", id), cb);
    };

    // Render a chart into a png or svg image
    //
    // * `format` is either "png" or "svg".
    //
    // Accepts the following parameters:
    //
    // * `start` an ISO 8601 timestamp specifying the start of the date
    //           range to be considered (optional).
    // * `end` an ISO 8601 timestamp specifying the end of the date
    //         range to be considered (optional).
    // * `width` the image width (optional, defaults to 600px).
    // * `height` the image height (optional, defaults to 300px).
    Charts.prototype.render = function(id, format, params, cb) {
        return this.client.get(helpers.url("/charts/{0}.{1}", id, format), cb);
    };

    return Charts;
});

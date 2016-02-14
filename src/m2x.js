define(["charts", "client", "collections", "devices", "distributions", "jobs", "keys", "metadata"],
function(Charts, Client, Collections, Devices, Distributions, Jobs, Keys, Metadata) {
    var M2X = function(apiKey, apiBase) {
        this.client = new Client(apiKey, apiBase);

        this.charts = new Charts(this.client);
        this.collections = new Collections(this.client, this.keys, this.metadata);
        this.devices = new Devices(this.client, this.keys, this.metadata);
        this.distributions = new Distributions(this.client, this.metadata);
        this.jobs = new Jobs(this.client);
        this.keys = new Keys(this.client);
        this.metadata = new Metadata(this.client);
    };

    M2X.prototype.status = function(callback, errorCallback) {
        return this.client.get("/status", callback, errorCallback);
    };

    return M2X;
});

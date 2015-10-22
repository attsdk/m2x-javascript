define(["charts", "client", "collections", "devices", "distributions", "jobs", "keys"],
function(Charts, Client, Collections, Devices, Distributions, Jobs, Keys) {
    var M2X = function(apiKey, apiBase) {
        this.client = new Client(apiKey, apiBase);

        this.charts = new Charts(this.client);
        this.collections = new Collections(this.client, this.keys);
        this.devices = new Devices(this.client, this.keys);
        this.distributions = new Distributions(this.client);
        this.jobs = new Jobs(this.client);
        this.keys = new Keys(this.client);
    };

    M2X.prototype.status = function(callback, errorCallback) {
        return this.client.get("/status", callback, errorCallback);
    };

    return M2X;
});

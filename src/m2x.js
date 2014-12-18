define(["Client", "Keys", "Devices", "Charts", "Distributions"],
function(Client, Keys, Devices, Charts, Distributions) {
    var M2X = function(apiKey, apiBase) {
        this.client = new Client(apiKey, apiBase);

        this.keys = new Keys(this.client);
        this.devices = new Devices(this.client, this.keys);
        this.charts = new Charts(this.client);
        this.distributions = new Distributions(this.client);
    };

    M2X.prototype.status = function(cb) {
        return this.client.get("/status", cb);
    };

    return M2X;
});

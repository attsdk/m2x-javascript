define(function() {
  var Response = function(error, res) {
      this.raw = res.responseText;
      if ("getAllResponseHeaders" in res) {
          this.headers = res.getAllResponseHeaders();
      } else {
          this.headers = {};
      }
      this.status = res.status;

      if (error) {
          this._error = { error: this.raw };
      } else {
          try {
              this.json = this.raw ? JSON.parse(this.raw) : {};
          } catch (ex) {
              this._error = { error: ex.toString() };
          }
      }
  };

  Response.prototype.error = function() {
      if (!this._error && this.isError()) {
          this._error = this.json || {};
      }
      return this._error;
  };

  Response.prototype.isError = function() {
      return (this._error || this.isClientError() || this.isServerError());
  };

  Response.prototype.isSuccess = function() {
      return !this.isError();
  };

  Response.prototype.isClientError = function() {
      return this.status >= 400 && this.status < 500;
  };

  Response.prototype.isServerError = function() {
      return this.status >= 500;
  };

  return Response;
});

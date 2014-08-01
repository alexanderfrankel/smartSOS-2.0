function RequestedItemsList() {
  this.requests = [];
  this.total = 0;
}

RequestedItemsList.prototype = {
  populate: function(data) {
    for(var i = 0; i < data.length; i++) {
      this.requests.push(data[i]);
    }
    this.updateTotal();
  },

  reduceQuantity: function(request) {
    for(var i=0; i<this.requests.length; i++) {
      if (request === this.requests[i]) {
        this.requests[i].quantity--;
      }
    }
    this.updateTotal();
  },

  increaseQuantity: function(request) {
    for(var i=0; i<this.requests.length; i++) {
      if (request === this.requests[i]) {
        this.requests[i].quantity++;
      }
    }
    this.updateTotal();
  },

  updateTotal: function() {
    this.total = 0;
    for(var i=0; i<this.requests.length; i++) {
      this.total += this.requests[i].price * this.requests[i].quantity;
    }
  }
};

function RequestedItemsList(registry) {
  this.items = [];
  this.total = 0;
  this.registry = registry;
  this.populate();
  this.updateTotal();
}

RequestedItemsList.prototype = {
  populate: function() {
    for(var i = 0; i < this.registry.length; i++) {
      this.items.push(this.registry[i]);
    }
    this.updateTotal();
  },

  reduceQuantity: function(item_id) {
    for(var i=0; i<this.items.length; i++) {
      if (item_id === this.items[i].id) {
        if(this.items[i].quantity > 0) {
          this.items[i].quantity--;
        }
      }
    }
    this.updateTotal();
  },

  increaseQuantity: function(item_id) {
    for(var i=0; i<this.items.length; i++) {
      if (item_id === this.items[i].id) {
        this.items[i].quantity++;
      }
    }
    this.updateTotal();
  },

  updateTotal: function() {
    this.total = 0;
    for(var i=0; i<this.items.length; i++) {
      this.total += this.items[i].price * this.items[i].quantity;
    }
  }
};

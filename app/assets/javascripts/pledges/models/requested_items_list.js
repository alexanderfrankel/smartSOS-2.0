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
    if(this.item(item_id).quantity > 0) {
      this.item(item_id).quantity--;
    }
    this.updateTotal();
    return true
  },

  item: function(item_id){
    for(var i=0; i<this.items.length; i++) {
      if (item_id === this.items[i].id) {
        return this.items[i];
      }
    }
  },

  increaseQuantity: function(item_id) {
    this.item(item_id).quantity++;
    this.updateTotal();
  },

  updateTotal: function() {
    this.total = 0;
    for(var i=0; i<this.items.length; i++) {
      this.total += this.items[i].price * this.items[i].quantity;
    }
  }
};

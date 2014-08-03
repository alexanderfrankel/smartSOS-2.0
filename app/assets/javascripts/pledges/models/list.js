function List(registry) {
  this.items = [];
  this.total = 0;
  this.registry = registry;
  this.populate();
  this.updateTotal();
}

List.prototype = {
  populate: function() {
    for(var i = 0; i < this.registry.length; i++) {
      this.items.push(this.registry[i]);
    }
    this.updateTotal();
  },

  reduceQuantity: function(item_id) {
    if(this.item(item_id).quantity > 0) {
      this.item(item_id).quantity--;
      this.updateTotal();
      return true
    }
    return false
  },

  item: function(item_id){
    for(var i=0; i<this.items.length; i++) {
      if (item_id === this.items[i].id) {
        return this.items[i];
      }
    }
  },

  increaseQuantity: function(item_id) {
    var existingPledge = this.item(item_id);
    if (existingPledge) {
        existingPledge.quantity++;
    } else {
      for(var i=0;i < registry.length; i++){
        item = registry[i];
        if(item_id === item.id){
          this.items.push(new Pledge(item.id, item.name, item.price, item.url));
        }
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

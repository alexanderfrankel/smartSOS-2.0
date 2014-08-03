// Initialize a list with a collection of data
function List(registry) {
  this.items = [];
  this.total = 0;
  this.registry = registry || [];
  this.populate();
  this.updateTotal();
}

// Standard fuctions in Lists
List.prototype = {
  populate: function() {
    for(var i = 0; i < this.registry.length; i++) {
      this.items.push(this.registry[i]);
    }
    this.updateTotal();
  },

  reduceQuantity: function(item_id) {
    var item = this.item(item_id);
    if(item && item.quantity > 0) {
      item.quantity--;

      if(item.quantity === 0) {
        this.items.splice(this.items.indexOf(item), 1)
      }
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
          this.items.unshift(new Pledge(item.id, item.name, item.price, item.url));
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
  },

  json: function(){
    var formattedPledgeData = []
    for(var i=0; i < this.items.length; i++) {
      var pledge = this.items[i];
      formattedPledgeData.push({"request_id": pledge.id, "quantity": pledge.quantity});
    }
    return {"pledge": formattedPledgeData};
  }
};

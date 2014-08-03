function PledgedItemsList(registry) {
    this.items = [];
    this.total = 0;
    this.registry = registry;
    this.populate();
    this.updateTotal();
}

PledgedItemsList.prototype = {
    populate: function() {
      for(var i = 0; i < this.registry.length; i++) {
        this.items.push(this.registry[i]);
      }
      this.updateTotal();
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

    item: function(item_id){
      for(var i=0; i<this.items.length; i++) {
        if (item_id === this.items[i].id) {
          return this.items[i];
        }
      }
    },

    reduceQuantity: function(pledge_id) {
      for ( var i = 0; i < this.items.length; i++) {
        if(this.items[i].id === pledge_id) {
          this.items[i].quantity--;
          if(this.items[i].quantity === 0) {
            this.items.splice(i, 1)
          }
        }
      }
      this.updateTotal();
    },

    updateTotal: function() {
        this.total = 0;
        for (var i = 0; i < this.items.length; i++) {
            this.total += this.items[i].price * this.items[i].quantity;
        }
    },

    data: function(){
      var formattedPledgeData = []
      for(var i=0; i < this.items.length; i++) {
        var pledge = this.items[i];
        formattedPledgeData.push({"request_id": pledge.id, "quantity": pledge.quantity});
      }
      return {"pledge": formattedPledgeData};
    }
}
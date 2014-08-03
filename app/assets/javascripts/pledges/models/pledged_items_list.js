function PledgedItemsList(registry) {
    this.items = [];
    this.total = 0;
    this.registry = registry;
    this.populate();
    this.updateTotal();
}

PledgedItemsList.prototype = new List();

PledgedItemsList.prototype.reduceQuantity = function(pledge_id) {
      for ( var i = 0; i < this.items.length; i++) {
        if(this.items[i].id === pledge_id) {
          this.items[i].quantity--;
          if(this.items[i].quantity === 0) {
            this.items.splice(i, 1)
          }
        }
      }
      this.updateTotal();
    }

PledgedItemsList.prototype.data = function(){
      var formattedPledgeData = []
      for(var i=0; i < this.items.length; i++) {
        var pledge = this.items[i];
        formattedPledgeData.push({"request_id": pledge.id, "quantity": pledge.quantity});
      }
      return {"pledge": formattedPledgeData};
    }
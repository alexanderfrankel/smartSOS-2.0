function PledgedItemsList(registry) {
    this.items = [];
    this.total = 0;
    this.registry = registry;
    this.populate();
    this.updateTotal();
}

PledgedItemsList.prototype = new List();

PledgedItemsList.prototype.reduceQuantity = function(item_id) {
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
}

PledgedItemsList.prototype.data = function(){
  var formattedPledgeData = []
  for(var i=0; i < this.items.length; i++) {
    var pledge = this.items[i];
    formattedPledgeData.push({"request_id": pledge.id, "quantity": pledge.quantity});
  }
  return {"pledge": formattedPledgeData};
}
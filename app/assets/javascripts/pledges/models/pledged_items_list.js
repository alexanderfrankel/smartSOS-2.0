function PledgedItemsList(registry) {
    this.items = [];
    this.total = 0;
    this.registry = registry;
    this.populate();
    this.updateTotal();
}

PledgedItemsList.prototype = new List();

PledgedItemsList.prototype.data = function(){
  var formattedPledgeData = []
  for(var i=0; i < this.items.length; i++) {
    var pledge = this.items[i];
    formattedPledgeData.push({"request_id": pledge.id, "quantity": pledge.quantity});
  }
  return {"pledge": formattedPledgeData};
}
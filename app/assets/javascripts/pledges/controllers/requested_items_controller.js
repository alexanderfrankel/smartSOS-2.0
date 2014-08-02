function RequestedItemsController(view) {
  this.list = view.list;
  this.view = view;
  this.render_list();
}

RequestedItemsController.prototype = {
  render_list: function(){
    this.view.render();
  },

  transferItem: function(item_id, other_list) {
    for(var i=0; i<requestModelData.length; i++) {
      if (requestModelData[i].id === item_id) {
        if (requestModelData[i].quantity > 0) {
          this.list.reduceQuantity(requestModelData[i]);
          other_list.addPledge(requestModelData[i]);
        }
      }
    }
  },
}

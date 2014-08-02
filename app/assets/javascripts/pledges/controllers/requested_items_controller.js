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
    var items = this.list.items;
    for(var i=0; i< items.length; i++) {
      if (items[i].id === item_id) {
        if (items[i].quantity > 0) {
          this.list.reduceQuantity(items[i]);
          other_list.addPledge(items[i]);
        }
      }
    }
  },
}

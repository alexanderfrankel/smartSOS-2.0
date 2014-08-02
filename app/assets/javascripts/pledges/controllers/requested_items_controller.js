function RequestedItemsController(view) {
  this.list = view.list;
  this.view = view;
  this.render_list();
}

RequestedItemsController.prototype = {
  listen: function(){
    var self = this;
    $(document).on('click', '.requested-item', function(event) {
      var item_id = $(this).data('id')
      self.transferItem(item_id, app.pledgedItemsController.list)
      app.pledgedItemsController.render_list();
    });
  },

  render_list: function(){
    this.view.render();
  },

  transferItem: function(item_id, other_list) {
    var items = this.list.items;
    for(var i=0; i< items.length; i++) {
      if (items[i].id === item_id) {
        if (items[i].quantity > 0) {
          this.list.reduceQuantity(items[i]);
          other_list.increaseQuantity(items[i]);
        }
      }
    }
    this.render_list();
  },
}

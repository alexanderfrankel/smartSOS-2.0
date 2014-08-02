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
      self.transfer(item_id, app.pledgedItemsController.list)
      app.pledgedItemsController.render_list();
    });
  },

  render_list: function(){
    this.view.render();
  },

  transfer: function(item_id, to) {
    this.list.reduceQuantity(item_id)
    to.increaseQuantity(item_id)
    this.render_list();
  }
}

function RequestedItemsController(list) {
  this.list = list;
  this.view = new RequestedItemsView(list);
  this.render();
}

RequestedItemsController.prototype = {
  listen: function(){
    var self = this;
    $(document).on('click', '.requested-item', function(event) {
      var item_id = $(this).data('id')
      self.transfer(item_id, app.pledgedItemsController.list)
      app.render();
    });
  },

  render: function(){
    this.view.render();
  },

  transfer: function(item_id, to) {
    if(this.list.reduceQuantity(item_id)){
      to.increaseQuantity(item_id);
    }
    this.render();
  }
}

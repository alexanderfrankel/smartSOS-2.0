function RequestedItemsController(requestedItemsView) {
  this.list = requestedItemsView.list;
  this.requestedItemsView = requestedItemsView;
}

RequestedItemsController.prototype = {
  init: function() {
    this.requestedItemsView.render(this.list);
  },

  render_list: function(){
    this.requestedItemsView.render();
  }
}

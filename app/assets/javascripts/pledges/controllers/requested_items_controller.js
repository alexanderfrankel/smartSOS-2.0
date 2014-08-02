function RequestedItemsController(requestedItemsView) {
  this.requestedItemsList = requestedItemsView.list;
  this.requestedItemsView = requestedItemsView;
}

RequestedItemsController.prototype = {
  init: function() {
    this.requestedItemsView.render(this.requestedItemsList);
  },

  render_list: function(){
    this.requestedItemsView.render();
  }
}

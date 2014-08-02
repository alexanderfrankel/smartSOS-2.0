function RequestedItemsController(view) {
  this.list = view.list;
  this.view = view;
}

RequestedItemsController.prototype = {
  init: function() {
    this.view.render(this.list);
  },

  render_list: function(){
    this.view.render();
  }
}

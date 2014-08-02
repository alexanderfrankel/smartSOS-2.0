function RequestedItemsController(view) {
  this.list = view.list;
  this.view = view;
}

RequestedItemsController.prototype = {
  init: function() {
    this.render_list();
  },

  render_list: function(){
    this.view.render();
  }
}

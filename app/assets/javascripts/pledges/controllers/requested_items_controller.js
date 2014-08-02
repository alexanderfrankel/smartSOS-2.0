function RequestedItemsController(view) {
  this.list = view.list;
  this.view = view;
  this.render_list();
}

RequestedItemsController.prototype = {
  render_list: function(){
    this.view.render();
  }
}

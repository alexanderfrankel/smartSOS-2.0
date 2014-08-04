function RequestedItemsController(list) {
  this.list = list || new List();
  this.view = new RequestedItemsView(list);
  this.render();
}

RequestedItemsController.prototype = new BaseListController();

RequestedItemsController.prototype.listen = function(){
  var self = this;
  $(document).on('click', '.requested-item', function(event) {
    var item_id = $(this).data('id')
    self.transfer(item_id, app.pledged_list)
    app.render();
  });
}
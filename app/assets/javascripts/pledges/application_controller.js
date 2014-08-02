var ApplicationController = function(requestedItemsController, pledgedItemsController) {
    this.requestedItemsController = requestedItemsController;
    this.pledgedItemsController = pledgedItemsController;
    requestedItemsController.listen();
    pledgedItemsController.listen();
};

ApplicationController.prototype = {
  transferItem: function(item_id, from, to) {
    from.transfer(item_id, to);
  }
}

var ApplicationController = function(requestedItemsController, pledgedItemsController) {
    this.requestedItemsController = requestedItemsController;
    this.pledgedItemsController = pledgedItemsController;
    requestedItemsController.listen();
    pledgedItemsController.listen();
};

ApplicationController.prototype = {
  transferItemBack: function(item_id) {
    for(var i=0; i<self.requestedItemsController.list.requests.length; i++) {

      if (self.requestedItemsController.list.requests[i].id === item_id) {

        this.requestedItemsController.list.increaseQuantity(self.requestedItemsController.list.requests[i]);
        this.pledgedItemsController.list.removePledge(item_id);

      }
    }
  }
}

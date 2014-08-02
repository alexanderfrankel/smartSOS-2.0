var ApplicationController = function(requestedItemsController, pledgedItemsController) {
    this.requestedItemsController = requestedItemsController;
    this.pledgedItemsController = pledgedItemsController;
    requestedItemsController.listen();
    pledgedItemsController.listen();
};

ApplicationController.prototype = {};
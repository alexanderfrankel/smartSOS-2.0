var ApplicationController = function(requestedItemsController, pledgedItemsController) {
  this.controllers = arguments;
    this.requestedItemsController = requestedItemsController;
    this.pledgedItemsController = pledgedItemsController;
    requestedItemsController.listen();
    pledgedItemsController.listen();
};

ApplicationController.prototype = {
  render: function(){
    for(var i = 0; i < this.controllers.length; i++){
      this.controllers[i].render();
    }
  }
};
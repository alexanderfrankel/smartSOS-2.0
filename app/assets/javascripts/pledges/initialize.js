var ready;
ready = function() {

  requestedItemsController = new RequestedItemsController(new List(registry));
  pledgedItemsController = new PledgedItemsController(new PledgedItemsList([]));

  appController = new ApplicationController(requestedItemsController, pledgedItemsController);

  window.app = appController;

};

$(document).ready(ready);
$(document).on('page:load', ready);
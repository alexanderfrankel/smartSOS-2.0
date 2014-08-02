var ready;
ready = function() {

  requestedItemsController = new RequestedItemsController(new RequestedItemsView(new RequestedItemsList(registry)));
  pledgedItemsController = new PledgedItemsController(new PledgedItemsView(new PledgedItemsList));

  appController = new ApplicationController(requestedItemsController, pledgedItemsController);

  window.app = appController;

};

$(document).ready(ready);
$(document).on('page:load', ready);
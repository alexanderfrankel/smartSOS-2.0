var ready;
ready = function() {

  requestedItemsController = new RequestedItemsController(new RequestedItemsView(new RequestedItemsList(requestModelData)));
  pledgedItemsController = new PledgedItemsController(new PledgedItemsView(new PledgedItemsList));

  appController = new ApplicationController(requestedItemsController, pledgedItemsController);
  appController.listenForPledgesSubmit();
  appController.listenForPledgesRemove();

  window.app = appController;

};

$(document).ready(ready);
$(document).on('page:load', ready);
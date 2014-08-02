var ready;
ready = function() {

  requestedItemsController = new RequestedItemsController(new RequestedItemsView(new RequestedItemsList(requestModelData)));
  pledgedItemsController = new PledgedItemsController(new PledgedItemsView(new PledgedItemsList));

  appController = new ApplicationController(requestedItemsController, pledgedItemsController);
  appController.listenForPledge();
  appController.listenForPledgesSubmit();
  appController.listenForPledgesRemove();

};

$(document).ready(ready);
$(document).on('page:load', ready);
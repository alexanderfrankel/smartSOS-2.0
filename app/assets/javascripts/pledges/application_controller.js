var ApplicationController = function(requestedItemsController, pledgedItemsController) {
    this.requestedItemsController = requestedItemsController;
    this.pledgedItemsController = pledgedItemsController;
    requestedItemsController.listen();
    pledgedItemsController.listen();
};

ApplicationController.prototype = {
  listenForPledgesSubmit: function() {
    var self = this;
    $(document).on('click', '#pledged-items-submit', function(event) {
      event.preventDefault();
      self.pledgedItemsController.submitPledgedItems();
    })
  },

  listenForPledgesRemove: function() {
    var self = this;
    $(document).on('click', '.pledged-item', function(event) {
      event.preventDefault();
      self.transferItemBack($(this).data('id'));
      self.pledgedItemsController.pledgedItemsView.render(self.pledgedItemsController.list);
      self.requestedItemsController.render_list();
    })
  },

  transferItemBack: function(item_id) {
    for(var i=0; i<self.requestedItemsController.list.requests.length; i++) {

      if (self.requestedItemsController.list.requests[i].id === item_id) {

        this.requestedItemsController.list.increaseQuantity(self.requestedItemsController.list.requests[i]);
        this.pledgedItemsController.list.removePledge(item_id);

      }
    }
  }
}

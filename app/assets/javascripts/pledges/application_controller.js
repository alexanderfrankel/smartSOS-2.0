var ApplicationController = function(requestedItemsController, pledgedItemsController) {
    this.requestedItemsController = requestedItemsController;
    this.pledgedItemsController = pledgedItemsController;
};

ApplicationController.prototype = {
  listenForPledge: function() {
    var self = this;
    $(document).on('click', '.requested-item', function(event) {
      self.transferItem($(this).data('id'));
      self.pledgedItemsController.pledgedItemsView.render(self.pledgedItemsController.pledgedItemsList);
      self.requestedItemsController.render_list();
    });
  },

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
      self.pledgedItemsController.pledgedItemsView.render(self.pledgedItemsController.pledgedItemsList);
      self.requestedItemsController.render_list();
    })
  },

  transferItem: function(item_id) {
    for(var i=0; i<requestModelData.length; i++) {
      if (requestModelData[i].id === item_id) {
        if (requestModelData[i].quantity > 0) {
          this.requestedItemsController.requestedItemsList.reduceQuantity(requestModelData[i]);
          this.pledgedItemsController.pledgedItemsList.addPledge(requestModelData[i]);
        }
      }
    }
  },

  transferItemBack: function(item_id) {
    for(var i=0; i<self.requestedItemsController.requestedItemsList.requests.length; i++) {

      if (self.requestedItemsController.requestedItemsList.requests[i].id === item_id) {

        this.requestedItemsController.requestedItemsList.increaseQuantity(self.requestedItemsController.requestedItemsList.requests[i]);
        this.pledgedItemsController.pledgedItemsList.removePledge(item_id);

      }
    }
  }
}

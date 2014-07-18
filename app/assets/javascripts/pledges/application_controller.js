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
            self.requestedItemsController.requestedItemsView.render(self.requestedItemsController.requestedItemsList);
        });
    },

    listenForPledgesSubmit: function() {
        var self = this;
        $(document).on('click', '#pledged-items-submit', function(event) {
            event.preventDefault();
            self.pledgedItemsController.submitPledgedItems();
        })
    },

    transferItem: function(item_id) {
        for (var i = 0; i < requestModelData.length; i++) {
            if (requestModelData[i].id === item_id) {
                if (requestModelData[i].quantity > 0) {
                    this.requestedItemsController.requestedItemsList.reduceQuantity(requestModelData[i]);
                    this.pledgedItemsController.pledgedItemsList.addPledge(requestModelData[i]);
                }
            }
        }
    }
}
function PledgedItemsController(list) {
  this.list = list;
  this.view = new PledgedItemsView(list);
}

PledgedItemsController.prototype = {

  listen: function() {
    var self = this;
    $(document).on('click', '#pledged-items-submit', function(event) {
      event.preventDefault();
      self.submitPledgedItems();
    })
    $(document).on('click', '.pledged-item', function(event) {
      event.preventDefault();
      self.transfer($(this).data('id'), app.requestedItemsController.list)
      app.requestedItemsController.render_list();
    })
  },

  submitPledgedItems: function() {
    var campaign_id = $('.dashboard-title').data('id');
    $.ajax({
      url: '/campaigns/' + campaign_id + '/pledges',
      type: 'POST',
      data: this.formattedPledgeData()
    }).done(function(response) {
      window.location.href = '/campaigns';
    });
  },

  formattedPledgeData: function() {
    var pledges = this.list.items
    var formattedPledgeData = []
    for(var i=0; i < pledges.length; i++) {
      formattedPledgeData.push({"request_id": pledges[i].id, "quantity": pledges[i].quantity})
    }
    return {"pledge": formattedPledgeData};
  },

  render_list: function() {
    this.view.render();
  },

  transfer: function(item_id, to) {
    this.list.reduceQuantity(item_id)
    to.increaseQuantity(item_id)
    this.render_list();
  }
}

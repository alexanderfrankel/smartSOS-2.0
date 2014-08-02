function PledgedItemsController(view) {
  this.list = view.list;
  this.view = view;
}

PledgedItemsController.prototype = {

  listen: function() {
    var self = this;
    $(document).on('click', '#pledged-items-submit', function(event) {
      event.preventDefault();
      app.submitPledgedItems();
    })
    $(document).on('click', '.pledged-item', function(event) {
      event.preventDefault();
      self.transferItem($(this).data('id'), app.requestedItemsController.list)
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

  transferItem: function(item_id, other_list) {
    var items = this.list.items;
    this.list.reduceQuantity(item_id)
    other_list.increaseQuantity(item_id)
    this.render_list();
  }
}

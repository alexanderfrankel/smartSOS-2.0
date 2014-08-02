function PledgedItemsController(pledgedItemsView) {
  this.list = pledgedItemsView.list;
  this.pledgedItemsView = pledgedItemsView;
}

PledgedItemsController.prototype = {
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
    var pledges = this.list.pledges
    var formattedPledgeData = []
    for(var i=0; i < pledges.length; i++) {
      formattedPledgeData.push({"request_id": pledges[i].id, "quantity": pledges[i].quantity})
    }
    return {"pledge": formattedPledgeData};
  },

  render_list: function() {
    this.pledgedItemsView.render();
  }
}

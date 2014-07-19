function PledgedItemsController(pledgedItemsList, pledgedItemsView) {
  this.pledgedItemsList = pledgedItemsList;
  this.pledgedItemsView = pledgedItemsView;
}

PledgedItemsController.prototype = {
  submitPledgedItems: function() {
    var campaign_id = $('.dashboard-title').data('id');
    $.ajax({
      url: '/campaigns/' + campaign_id + '/pledges',
      type: 'POST',
      data: this.formattedPledgeData()
    });
  },

  formattedPledgeData: function() {
    var pledges = this.pledgedItemsList.pledges
    var formattedPledgeData = []
    for(var i=0; i < pledges.length; i++) {
      formattedPledgeData.push({"request_id": pledges[i].id, "quantity": pledges[i].quantity})
    }
    return {"pledge": formattedPledgeData};
  }
}

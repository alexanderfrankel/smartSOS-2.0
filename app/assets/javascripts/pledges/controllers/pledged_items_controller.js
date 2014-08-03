function PledgedItemsController(list) {
  this.list = list;
  this.view = new PledgedItemsView(list);
  this.render();
}

PledgedItemsController.prototype = new BaseListController([]);

PledgedItemsController.prototype.listen = function() {
    var self = this;
    $(document).on('click', '#pledged-items-submit', function(event) {
      event.preventDefault();
      self.submitPledgedItems();
    })
    $(document).on('click', '.pledged-item', function(event) {
      event.preventDefault();
      self.transfer($(this).data('id'), app.requestedItemsController.list)
      app.render();
    })
  }

PledgedItemsController.prototype.submitPledgedItems = function() {
    var campaign_id = $('.dashboard-title').data('id');
    $.ajax({
      url: '/campaigns/' + campaign_id + '/pledges',
      type: 'POST',
      data: this.list.json()
    }).done(function(response) {
      window.location.href = '/campaigns';
    });
  }
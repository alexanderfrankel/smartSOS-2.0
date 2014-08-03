var ApplicationController = function(requested_list, pledged_list) {
  this.requested_list = requested_list;
  this.pledged_list = pledged_list;

  this.controllers = [new RequestedItemsController(requested_list), new PledgedItemsController(pledged_list)]
  for(var i = 0; i < this.controllers.length; i++){
    this.controllers[i].listen();
  }
};

ApplicationController.prototype = {
  render: function(){
    for(var i = 0; i < this.controllers.length; i++){
      this.controllers[i].render();
    }
  }
};
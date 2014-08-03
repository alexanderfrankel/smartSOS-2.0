var ready;
ready = function() {

  // Initialize the lists with stored data
  requested_list = new List(registry);
  pledged_list = new List([])

  appController = new ApplicationController(requested_list, pledged_list);

  window.app = appController;

};

$(document).ready(ready);
$(document).on('page:load', ready);
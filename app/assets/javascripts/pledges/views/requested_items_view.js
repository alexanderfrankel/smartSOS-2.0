function RequestedItemsView(list) {
  this.list = list || new List();
  this.css_prefix = 'requested';
};

RequestedItemsView.prototype = new ListView();
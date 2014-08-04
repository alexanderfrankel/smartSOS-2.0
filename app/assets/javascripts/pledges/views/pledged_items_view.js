function PledgedItemsView(list) {
  this.list = list || new List();
  this.css_prefix = 'pledged'
};

PledgedItemsView.prototype = new ListView();
function BaseListController(list){
  this.list = list;
  this.view = new ListView(list);
  this.render();
}

BaseListController.prototype = {
  render: function(){
    this.view.render();
  },

  transfer: function(item_id, to) {
    if(this.list.reduceQuantity(item_id)){
      to.increaseQuantity(item_id);
    }
    this.render();
  }
}
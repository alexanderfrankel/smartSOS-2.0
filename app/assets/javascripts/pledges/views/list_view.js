function ListView(list) {
  this.list = list;
};

ListView.prototype = {
    render: function() {
      return ''
    },

    render_item: function(item){
      var pledgedItemFormat = '<div class="item" data-id="'
      pledgedItemFormat += item.id;
      pledgedItemFormat += '">';
      pledgedItemFormat += '<div class="item-name">';
      pledgedItemFormat += item.name;
      pledgedItemFormat += '</div>';
      pledgedItemFormat += '<div class="item-quantity">x';
      pledgedItemFormat += item.quantity;
      pledgedItemFormat += '</div>';
      pledgedItemFormat += '<div class="item-price">$';
      pledgedItemFormat += item.price;
      pledgedItemFormat += '</div></div>';
      return pledgedItemFormat;
    }
}
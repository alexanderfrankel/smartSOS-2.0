function PledgedItemsView(list) {
  this.list = list;
};

PledgedItemsView.prototype = {
    render: function() {
        $('.pledged-items-total').text('$' + this.list.total.toFixed(2));

        $('.pledged-items-list').empty();

        for (var i = 0; i < this.list.items.length; i++) {
            $('.pledged-items-list').append(this.render_item(this.list.items[i]));
        }
    },

    render_item: function(item){
      var pledgedItemFormat = '<div class="pledged-item" data-id="'
      pledgedItemFormat += item.id;
      pledgedItemFormat += '">';
      pledgedItemFormat += '<div class="pledged-item-name">';
      pledgedItemFormat += item.name;
      pledgedItemFormat += '</div>';
      pledgedItemFormat += '<div class="pledged-item-quantity">x';
      pledgedItemFormat += item.quantity;
      pledgedItemFormat += '</div>';
      pledgedItemFormat += '<div class="pledged-item-price">$';
      pledgedItemFormat += item.price;
      pledgedItemFormat += '</div></div>';
      return pledgedItemFormat;
    }
}
function RequestedItemsView(list) {
  this.list = list;
};

RequestedItemsView.prototype = {
    render: function() {
        var requestedItems = this.list.requests

        $('.requested-items-total').text('$' + this.list.total.toFixed(2));
        $('.requested-items-list').empty();

        for (var i = 0; i < requestedItems.length; i++) {
            $('.requested-items-list').append(this.render_item(requestedItems[i]));
        }
    },

    render_item: function(item){
      var requestedItemFormat = '<div class="requested-item" data-id="';
      requestedItemFormat += item.id;
      requestedItemFormat += '">';
      requestedItemFormat += '<div class="requested-item-img">'
      requestedItemFormat += '<img src="' + item.url + '">'
      requestedItemFormat += '</div>'
      requestedItemFormat += '<div class="requested-item-name">';
      requestedItemFormat += item.name;
      requestedItemFormat += '</div>';
      requestedItemFormat += '<div class="requested-item-quantity"> Quantity: x';
      requestedItemFormat += item.quantity;
      requestedItemFormat += '</div>';
      requestedItemFormat += '<div class="requested-item-price">Price: $';
      requestedItemFormat += item.price;
      requestedItemFormat += '</div></div>';
      return requestedItemFormat;
    }
}
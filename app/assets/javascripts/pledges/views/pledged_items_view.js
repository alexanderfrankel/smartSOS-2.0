function PledgedItemsView(list) {
  this.list = list;
};

PledgedItemsView.prototype = {
    render: function() {
        var pledgedItems = this.list.pledges;

        $('.pledged-items-total').text('$' + this.list.total.toFixed(2));

        $('.pledged-items-list').empty();

        for (var i = 0; i < pledgedItems.length; i++) {
            var pledgedItemFormat = '<div class="pledged-item" data-id="'
            pledgedItemFormat += pledgedItems[i].id;
            pledgedItemFormat += '">';
            pledgedItemFormat += '<div class="pledged-item-name">';
            pledgedItemFormat += pledgedItems[i].name;
            pledgedItemFormat += '</div>';
            pledgedItemFormat += '<div class="pledged-item-quantity">x';
            pledgedItemFormat += pledgedItems[i].quantity;
            pledgedItemFormat += '</div>';
            pledgedItemFormat += '<div class="pledged-item-price">$';
            pledgedItemFormat += pledgedItems[i].price;
            pledgedItemFormat += '</div></div>';
            $('.pledged-items-list').append(pledgedItemFormat);
        }
    }
}
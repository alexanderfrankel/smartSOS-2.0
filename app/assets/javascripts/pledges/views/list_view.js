function ListView(list) {
  this.list = list || new List();
  this.css_prefix = '';
};

ListView.prototype = {
    render: function() {
      $('.' + this.container_class('total')).text('$' + this.list.total.toFixed(2));

      var list_container = $('.' + this.container_class('list'));
      list_container.empty();

      for (var i = 0; i < this.list.items.length; i++) {
         list_container.append(this.render_item(this.list.items[i]));
      }
    },

    render_item: function(item){
      var pledgedItemFormat = '<div class="'+this.item_class('')+'" data-id="'
      pledgedItemFormat += item.id;
      pledgedItemFormat += '">';
      pledgedItemFormat += this.image(item);
      pledgedItemFormat += this.name(item);
      pledgedItemFormat += this.quantity(item);
      pledgedItemFormat += this.price(item);
      pledgedItemFormat += '</div>';
      return pledgedItemFormat;
    },

    // Join the css_prefix, items, and the specified part.
    // Setting a css_prefix of 'pledged' and sending the argument 'total'
    // will return 'pledged-items-total'
    container_class: function(part){
      var klass = [this.css_prefix,'items',part].filter(function(string) { if (string !== '') { return string } }).join('-');
      return klass
    },

    // Join the css_prefix, item, and the specified part.
    // Setting a css_prefix of 'pledged' and sending the argument 'total'
    // will return 'pledged-item-total'
    item_class: function(part){
      var klass = [this.css_prefix,'item',part].filter(function(string) { if (string !== '') { return string } }).join('-');
      return klass
    },

    image: function(item){
      return '<div class="'+this.item_class('img')+'"><img src="' + item.url + '" /></div>';
    },

    name: function(item){
      return '<div class="'+this.item_class('name')+'">' + item.name + '</div>';
    },

    quantity: function(item){
      return '<div class="'+this.item_class('quantity')+'">x' + item.quantity + '</div>';
    },

    price: function(item){
      return '<div class="'+this.item_class('price')+'">$' + item.price + '</div>';
    }
}
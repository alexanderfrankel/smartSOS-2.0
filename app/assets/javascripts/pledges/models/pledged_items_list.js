function PledgedItemsList() {
    this.items = [];
    this.total = 0;
}

PledgedItemsList.prototype = {
    increaseQuantity: function(newPledge) {
        var existingPledge = this.pledgeExists(newPledge.id);
        if (existingPledge) {
            existingPledge.quantity++;
        } else {
            this.items.push(new Pledge(newPledge.id, newPledge.name, newPledge.price, newPledge.url));
        }
        this.updateTotal();
    },

    pledgeExists: function(item_id) {
        for (var i = 0; i < this.items.length; i++) {
            if (item_id === this.items[i].id) {
                return this.items[i];
            }
        }
        return false;
    },

    reduceQuantity: function(pledge_id) {
      for ( var i = 0; i < this.items.length; i++) {
        if(this.items[i].id === pledge_id) {
          this.items[i].quantity--;
          if(this.items[i].quantity === 0) {
            this.items.splice(i, 1)
          }
        }
      }
      this.updateTotal();
    },

    updateTotal: function() {
        this.total = 0;
        for (var i = 0; i < this.items.length; i++) {
            this.total += this.items[i].price * this.items[i].quantity;
        }
    }
}
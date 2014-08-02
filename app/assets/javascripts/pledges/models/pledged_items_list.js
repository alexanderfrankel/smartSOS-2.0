function PledgedItemsList() {
    this.pledges = [];
    this.total = 0;
}

PledgedItemsList.prototype = {
    increaseQuantity: function(newPledge) {
        var existingPledge = this.pledgeExists(newPledge);
        if (existingPledge) {
            existingPledge.quantity++;
        } else {
            this.pledges.push(new Pledge(newPledge.id, newPledge.name, newPledge.price, newPledge.url));
        }
        this.updateTotal();
    },

    pledgeExists: function(newPledge) {
        for (var i = 0; i < this.pledges.length; i++) {
            if (newPledge.id === this.pledges[i].id) {
                return this.pledges[i];
            }
        }
        return false;
    },

    reduceQuantity: function(pledge_id) {
      for ( var i = 0; i < this.pledges.length; i++) {
        if(this.pledges[i].id === pledge_id) {
          this.pledges[i].quantity--;
          if(this.pledges[i].quantity === 0) {
            this.pledges.splice(i, 1)
          }
        }
      }
      this.updateTotal();
    },

    updateTotal: function() {
        this.total = 0;
        for (var i = 0; i < this.pledges.length; i++) {
            this.total += this.pledges[i].price * this.pledges[i].quantity;
        }
    }
}
function PledgedItemsList() {
    this.pledges = [];
    this.total = 0;
}

PledgedItemsList.prototype = {
    addPledge: function(newPledge) {
        var existingPledge = this.pledgeExists(newPledge);
        if (existingPledge) {
            existingPledge.quantity++;
        } else {
            this.pledges.push(new Pledge(newPledge.id, newPledge.asin, newPledge.name, newPledge.price, newPledge.url));
        }
        console.log(this.pledges);
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

    updateTotal: function() {
        this.total = 0;
        for (var i = 0; i < this.pledges.length; i++) {
            this.total += this.pledges[i].price * this.pledges[i].quantity;
        }
    }
}
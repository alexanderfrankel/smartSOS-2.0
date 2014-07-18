function Pledge(id, asin, name, price, url) {
    // below should be 'request_id'
    this.id = id;
    this.asin = asin;
    this.name = name;
    this.price = price;
    this.quantity = 1;
    this.url = url;
}
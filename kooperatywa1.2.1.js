Products = new Mongo.Collection("products");
Orders = new Mongo.Collection("orders");

if (Meteor .isClient) {
  
  Template.productsList.helpers({
    showProducts: function () {
      var sortAttr = Session.get('sortAttr');
      var sortOrder = Session.get('sortOrder') || 1;
      return Products.find({}, { sort: {[sortAttr]: sortOrder} });
    },
    nameTriangle: function () {
      if (Session.get('sortAttr') === 'productName') return true;
    },
    producerTriangle: function() {
      if (Session.get('sortAttr') === 'producer') return true;
    },
    priceTriangle: function() {
      if (Session.get('sortAttr') === 'price') return true;
    },
    sortOrder: function(){
      if (Session.get('sortOrder') === 1) {
        return '&blacktriangle;';
      }
      else if (Session.get('sortOrder') === -1) {
        return '&blacktriangledown;';
      }
    }
  });

  Template.productsList.events({
    "submit .orderProduct": function (event) {
      event.preventDefault();
      var quantity = event.target.quantity.value;
      var productName = this.productName;
      var producer = this.producer;
      var productsId = this._id;
      var unit = this.unit;
      var price = this.price;
      var summedPrice = price * quantity;

      if(!(Orders.find(this._id).fetch().length)) {
        Orders.insert({
        _id: productsId,
        productName: productName,
        producer: producer,
        quantity: quantity,
        unit: unit,
        createdAt: new Date(),
        purchaser: Meteor.userId(),
        price: price,
        summedPrice: summedPrice
        });   
      } else {
        Orders.update(productsId, {$set: {quantity: quantity, summedPrice: summedPrice}});
        }
    },
    "click .delete": function () {
      if (confirm("UsunÄ…Ä‡ produkt?")){
        Products.remove(this._id);
      }
    },
    "click .name": function() {
      Session.set('sortNameOrder', Session.get('sortOrder') * -1 || -1);
      Session.set('sortAttr', 'productName');
      Session.set('sortOrder', Session.get('sortNameOrder'));
    },
    "click .producer": function() {
      Session.set('sortProducerOrder', Session.get('sortOrder') * -1 || -1);
      Session.set('sortAttr', 'producer');
      Session.set('sortOrder', Session.get('sortProducerOrder'));
    },
    "click .price": function() {
      Session.set('sortPriceOrder', Session.get('sortOrder') * -1 || -1);
      Session.set('sortAttr', 'price');
      Session.set('sortOrder', Session.get('sortPriceOrder'));
    }
  });

  Template.ordersList.helpers({
    showOrders: function () {
      return Orders.find({}, {sort: {createdAt: -1}});
    },
    orderSum: function() {
      console.log(Orders.find().summedPrice);
    }
  });

  Template.ordersList.events({
    "click .delete": function () {
      Orders.remove(this._id)
    }
  });

  Template.insertProduct.events({
    "submit .insertProduct": function (event) {
        event.preventDefault();
        var productName = event.target.productName.value;
        var producer = event.target.producer.value;
        var price = Number(event.target.price.value);
        var createdAt = new Date();
        var owner = Meteor.userId();
        var unit = event.target.unit.value;

        Products.insert({
        productName: productName,
        producer: producer,
        price: price,
        createdAt: createdAt,
        owner: owner,
        unit: unit
        });

        event.target.productName.value = "";
        event.target.producer.value = "";
        event.target.price.value = "";
        } 
    });
}
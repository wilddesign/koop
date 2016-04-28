Products = new Mongo.Collection("products");
Orders = new Mongo.Collection("orders");


if(Meteor.isServer){
//publish Products and Orders
	Meteor.publish('products',function(){
			return Products.find();
	});
	Meteor.publish('orders',function(){
			return Orders.find();
	});
// we need a server-side only methods to export Orders and Products to external file,
// a  method for clearing any of the databases
// and removing users
}


if (Meteor.isClient) {
  //subscribe to products and orders from server
	Meteor.subscribe('products');
	Meteor.subscribe('orders');
//
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

        Meteor.call('placeOrder',this._id,this.productName,this.producer,event.target.quantity.value,this.unit,this.price);
      
    },
    "click .delete": function () {
      if (confirm("Usunąć produkt?")){
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
 
        Meteor.call('insertProduct',event.target.productName.value,event.target.producer.value,Number(event.target.price.value),event.target.unit.value);

        event.target.productName.value = "";
        event.target.producer.value = 0;
        event.target.price.value = 0;
        } 
    });

}




// methods for manipulating the databases
Meteor.methods({
	'insertProduct':function(productName,producer,price,unit){
				var currentUserID = Meteor.userId();
				//insert
				Products.insert({
					productName: productName,
					producer: producer,
					price: price,
					createdAt: new Date(),
					owner: currentUserID,
					unit: unit
        			});
	},
	'removeOwnOffer':function(){
		//to be continued..
	},
	'placeOrder':function(_id,productName,producer,quantity,unit,price){

		if(!(Orders.find(_id).fetch().length)) {//problem
			var purchaser=Meteor.userId();
			Orders.insert({
				_id: _id,
				productName: productName,
				producer: producer,
				quantity: quantity,
				unit: unit,
				createdAt: new Date(),
				purchaser: purchaser,
				price: price,
				summedPrice: price * quantity
			});   
		      } else {
				Orders.update(productsId, {$set: {quantity: quantity, summedPrice: summedPrice}});
        			}
	},

	'removeOrder':function(){
		//to be continued..
	}



});

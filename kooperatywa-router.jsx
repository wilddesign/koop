
// app routing with flowrouter
	FlowRouter.route('/',{
		action: function() {
			BlazeLayout.render('mainLayout', {intro: 'startIntro', content: 'startContent'});
		}
	});

// list of offers
	FlowRouter.route('/ibuy',{
		action: function() {
			BlazeLayout.render('mainLayout', {intro: 'iBuyIntro', content: 'iBuyContent'});
		}
	});

// buyer's cart
	FlowRouter.route('/mycart',{
		action: function() {
			BlazeLayout.render('mainLayout', {intro: 'myCartIntro', content: 'myCartContent'});
		}
	});

// seller's panel
	FlowRouter.route('/isell',{
		action: function() {
			BlazeLayout.render('mainLayout', {intro: 'iSellIntro', content: 'iSellContent'});
		}
	});

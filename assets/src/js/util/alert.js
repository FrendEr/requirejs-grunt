define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Bb) {

	//test jquery
	console.log('test jquery, length: ' + $('#targetId').length);

	//test underscore
	console.log('test underscore, each fn: ' + _.each);

	//test backbone
	var model = Bb.Model.extend({
		defaults: {
			name: 'bb'
		}
	});
	console.log('test backbone, model: ' + model);

	var Alert = function() {
		var msg = 'alert message';

		this.say = function(string) {
			console.log('test main, msg: ' + string || this.msg || '');
		}
	};

	return Alert;

});
define("js/util/alert",["jquery","underscore","backbone"],function(e,t,n){console.log("test jquery, length: "+e("#targetId").length),console.log("test underscore, each fn: "+t.each);var r=n.Model.extend({defaults:{name:"bb"}});console.log("test backbone, model: "+r);var i=function(){var e="alert message";this.say=function(e){console.log("test main, msg: "+e||this.msg||"")}};return i}),require(["js/util/alert"],function(e){var t=new e;t.say("hello world!")}),define("js/apps/home-app/home-app-main",function(){});
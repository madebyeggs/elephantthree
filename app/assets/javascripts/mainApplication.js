// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require require.js
//= require Header.js
//= require common.js
//= require util.js
//= require Footer.js
//= require jquery.fitvids.js

require.config({
	"waitSeconds": 0,
	"paths": {
		"root": "http://hsachs.at/",
		"base": "http://hsachs.at/Base/Js/",
		"project": "http://hsachs.at/Assets/Js/",
		"jquery": "http://hsachs.at/Base/Js/Vendor/JQuery",
		"async": "http://hsachs.at/Base/Js/Vendor/Async",
		"flickity": "http://hsachs.at/Assets/Js/Vendor/Flickity",
		"debounce": "http://hsachs.at/Assets/Js/Vendor/debounce",
		"waypoint": "http://hsachs.at/Assets/Js/Vendor/waypoint"
	},
	"shim": {
		"flickity": [
    		"jquery"
		],
		"debounce": [
    		"jquery"
		],
		"waypoint": [
    		"jquery"
		]
	}
});

$(document).ready(function(){
	$(".iframe").fitVids();
});

function loadIframe(iframeName, url) {
    var $iframe = $('#' + iframeName);
    if ( $iframe.length ) {
        $iframe.attr('src',url);   
        return false;
    }
    return true;
}
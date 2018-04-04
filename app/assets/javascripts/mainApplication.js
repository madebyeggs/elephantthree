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
	
	$('.bgImage').on('click',function(){
	    var image = $(this).data('image');
	    $('.bgImage').fadeOut('3000');
	});
});

function loadIframe(iframeName, url) {
    var $iframe = $('#' + iframeName);
    if ( $iframe.length ) {
        $iframe.attr('src',url);   
        return false;
    }
    return true;
}
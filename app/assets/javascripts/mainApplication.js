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
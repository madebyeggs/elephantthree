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
//= require jquery
//= require bootstrap
//= require jquery.turbolinks
//= require 'rest_in_place'
//= require best_in_place
//= require jquery_ujs
//= require jquery-ui/sortable
//= require jquery-ui/effect-highlight
//= require turbolinks
//= require nprogress
//= require nprogress-turbolinks
//= require update_works_row_order
//= require update_announcements_row_order
//= require Footer

$(document).ready(function(){
	
	$(".change").on("ajax:success",function(){
	    location.reload();
	});
	
	$(".lazy").lazyload();
	
	$('.delete_post').on('click', function() {
		if(confirm('Are you sure you want to delete this record')){
	    	return true
	    }else{
	        return false;
	    }
	});
	
	$(".iframe").fitVids();
	
	var options = {clickToPlay: true, controls: ['fullscreen']}
	
	plyr.setup(document.querySelectorAll('.js-player'), options);
	
  	jQuery(".best_in_place").best_in_place();

	$('#myTabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	
});
$(function() {
	$("#works_search input").keyup(function(e) {
    	$.get($("#works_search").attr("action"), $("#works_search").serialize(), null, "script");
    	return false;
		e.PreventDefault()
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

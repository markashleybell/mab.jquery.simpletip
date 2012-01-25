///////////////////////////////////////////////////////////////////////////////////////////
// Simpletip 1.0
// Version 1.0
// @requires jQuery v1.7.1
// 
// Copyright (c) 2011 Mark Ashley Bell
// Examples and docs at: http://markashleybell.com/jquery/jquery.simpletip.html
// 
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
///////////////////////////////////////////////////////////////////////////////////////////

(function($)
{
    $.fn.simpletip = function(settings)
    {
        var config = { 
            'toolTipId': 'tooltip',
            'toolTipClass': 'tooltip',
            'contentFunction': function(element) { return $(element).attr('alt'); } // A function which returns the content for our tooltip, given the element we are processing
        };

        if (settings) $.extend(config, settings);
        
        if(!window.$_TOOLTIP_INFO)
        {
        	$('body').append('<div id="' + config['toolTipId'] + '" class="' + config['toolTipClass'] + '" />');
        	
        	window.$_TOOLTIP_INFO = {
									obj: null,
									offsetX: 0,
									offsetY: 0
								};
	
			$_TOOLTIP_INFO.obj = $('#' + config['toolTipId']);
			$_TOOLTIP_INFO.obj.hide();
		}
        
        this.each(function()
        {
			var img = $(this);
	        var content = '<span>?</span>';

            if(config['contentFunction'] !== undefined) 
                content = config['contentFunction'](img);

		    img.bind('mouseover', function(){
		        $_TOOLTIP_INFO.obj.html(content);
		        $_TOOLTIP_INFO.offsetX = ($_TOOLTIP_INFO.obj.width() + 10);
				$_TOOLTIP_INFO.offsetY = ($_TOOLTIP_INFO.obj.height() + 10);
		        $_TOOLTIP_INFO.obj.show();
		    });
		        
		    img.bind('mousemove', function(e){
		        $_TOOLTIP_INFO.obj.css({ 'top': (e.pageY - $_TOOLTIP_INFO.offsetY) + 'px', 'left': (e.pageX - $_TOOLTIP_INFO.offsetX) + 'px',});
		    });
		        
		    img.bind('mouseout', function(){
		        $_TOOLTIP_INFO.obj.hide();
		    });
        });

        return this;
    };

})(jQuery);
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
            'toolTipWidth': 200,
            'toolTipHeight': 50,
            'contentFunction': function(element) { return $(element).attr('alt'); } // A function which returns the content for our tooltip, given the element we are processing
        };

        if (settings) $.extend(config, settings);
        
        if(!window.$_TOOLTIP_INFO)
            window.$_TOOLTIP_INFO = [];

        $('body').append('<div id="' + config['toolTipId'] + '" class="' + config['toolTipClass'] + '" />');
        	
        $_TOOLTIP_INFO[config['toolTipId']] = {
			obj: null,
			offsetX: 0,
			offsetY: 0
		};

        $_TOOLTIP_INFO[config['toolTipId']].obj = $('#' + config['toolTipId']);
        $_TOOLTIP_INFO[config['toolTipId']].obj.hide();
        
        this.each(function()
        {
			var img = $(this);
	        var content = '<span>?</span>';

            if(config['contentFunction'] !== undefined) 
                content = config['contentFunction'](img);

		    img.bind('mouseover', function(){
		        $_TOOLTIP_INFO[config['toolTipId']].obj.html(content);
		        $_TOOLTIP_INFO[config['toolTipId']].offsetX = ($_TOOLTIP_INFO[config['toolTipId']].obj.width() + 10);
		        $_TOOLTIP_INFO[config['toolTipId']].offsetY = ($_TOOLTIP_INFO[config['toolTipId']].obj.height() + 10);
		        $_TOOLTIP_INFO[config['toolTipId']].obj.show();
		    });
		        
		    img.bind('mousemove', function(e){
		        $_TOOLTIP_INFO[config['toolTipId']].obj.css({ 'top': (e.pageY - $_TOOLTIP_INFO[config['toolTipId']].offsetY) + 'px', 'left': (e.pageX - $_TOOLTIP_INFO[config['toolTipId']].offsetX) + 'px' });
		    });
		        
		    img.bind('mouseout', function(){
		        $_TOOLTIP_INFO[config['toolTipId']].obj.hide();
		    });
        });

        return this;
    };

})(jQuery);
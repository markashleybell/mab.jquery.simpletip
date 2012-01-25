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

(function ($) {
    $.fn.simpletip = function (settings) {
        var config = {
            'toolTipId': 'tooltip',
            'toolTipClass': 'tooltip',
            'contentFunction': function (element) { return $(element).attr('alt'); } // A function which returns the content for our tooltip, given the element we are processing
        };

        if (settings) $.extend(config, settings);

        if (!window.$_TOOLTIP_INFO)
            window.$_TOOLTIP_INFO = [];

        $('body').append('<div id="' + config['toolTipId'] + '" class="' + config['toolTipClass'] + '" />');

        var tip = $_TOOLTIP_INFO[config['toolTipId']];

        tip = {
            obj: null,
            offsetX: 0,
            offsetY: 0
        };

        tip.obj = $('#' + config['toolTipId']);
        tip.obj.hide();

        this.each(function () {
            var img = $(this);
            var content = '<span>?</span>';

            if (config['contentFunction'] !== undefined)
                content = config['contentFunction'](img);

            img.bind('mouseover', function () {
                tip.obj.html(content);
                tip.offsetX = (tip.obj.width() + 10);
                tip.offsetY = (tip.obj.height() + 10);
                tip.obj.show();
            });

            img.bind('mousemove', function (e) {
                tip.obj.css({ 'top': (e.pageY - tip.offsetY) + 'px', 'left': (e.pageX - tip.offsetX) + 'px' });
            });

            img.bind('mouseout', function () {
                tip.obj.hide();
            });
        });

        return this;
    };

})(jQuery);
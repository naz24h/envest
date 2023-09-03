(function($) {
    "use strict";

    depp.define({
        'msw-chart-js': [mstocks.url + 'assets/public/js/Chart.min.js'],
        'msw-echarts': [mstocks.url + 'assets/public/js/echarts-en.min.js'],
        'msw-tinycolor': [mstocks.url + 'assets/public/js/tinycolor.min.js'],
        'msw-rangeslider': [mstocks.url + 'assets/public/js/rangeslider.min.js'],
        'msw-datatable': [mstocks.url + 'assets/public/js/jquery.dataTables.min.js'],
        'msw-datatable-responsive': [mstocks.url + 'assets/public/js/dataTables.responsive.min.js'],
        'msw-dragscroll': [mstocks.url + 'assets/public/js/dragscroll.js'],
        'msw-typeahead': [mstocks.url + 'assets/public/js/typeahead.bundle.min.js']
    });

    mstocks.addCommas = function(nStr, d, s) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? d + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + s + '$2');
        }
        return isNaN(nStr) ? "" : x1 + x2;
    }

    // JS equivalent for PHP's number_format
    mstocks.number_format = function(number, decimals, dec_point, thousands_point) {
        if (number == null || !isFinite(number)) {
            return '';
        }
    
        if (!decimals) {
            var len = number.toString().split('.').length;
            decimals = len > 1 ? len : 0;
        }
    
        if (!dec_point) {
            dec_point = '.';
        }
    
        if (!thousands_point) {
            thousands_point = ',';
        }
    
        number = parseFloat(number).toFixed(decimals);
    
        number = number.replace(".", dec_point);
    
        var splitNum = number.split(dec_point);
        splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
        number = splitNum.join(dec_point);
    
        return number;
    }

    // Format number based on fiat currency
    mstocks.numberFormat = function(num, iso, shorten = false, decimals = 'auto') {
        num = parseFloat(num);
        var format = (mstocks.currency_format[iso] !== undefined) ? mstocks.currency_format[iso] : mstocks.default_currency_format;

        if (shorten) {
            decimals = format.decimals;
        } else if (decimals == 'auto') {
            decimals = (num >= 1) ? format.decimals : (num < 0.000001 ? 14 : 6);
        } else {
            decimals = parseInt(decimals);
        }

        num = num.toFixed(decimals);

        var index = 0;
        var suffix = '';
        var suffixes = mstocks.suffixes.hasOwnProperty(iso) ? mstocks.suffixes[iso] : mstocks.suffixes['USD'];

        if (shorten) {
            while (num > 1000) {
                num = num / 1000;
                index++;
            }
            suffix = suffixes[index];
        }

        return mstocks.number_format(num, decimals, format.decimals_sep, format.thousands_sep) + suffix;
    }

    mstocks.priceFormat = function(price, currency) {

        price = parseFloat(price);
        var format = (mstocks.currency_format[currency] !== undefined) ? mstocks.currency_format[currency] : mstocks.default_currency_format;
        var decimals = (price >= 1) ? format.decimals : 4;

        var out = format.position;
        out = out.replace('{symbol}', format.symbol);
        out = out.replace('{space}', ' ');
        out = out.replace('{price}', mstocks.addCommas(price.toFixed(decimals), format.decimals_sep, format.thousands_sep));

        return out;
    }

    mstocks.addDecimals = function(price, currency) {
        price = parseFloat(price);
        return price;
    }

    var mswTickers = [];

    $.fn.multiply = function(numCopies) {
        var newElements = this.clone();
        for(var i = 1; i < numCopies; i++) {
            newElements = newElements.add(this.clone());
        }
        return newElements;
    };

    $.fn.mswDrawChart = function() {

        var self = $(this);
    
        depp.require('msw-chart-js', function() {
    
            var canvas = self.find('canvas');
            var currency = self.data('currency');
            var border = canvas.data('border');
            var colors = canvas.data('colors').split('|');
            var values = canvas.data('points').toString().split(',');
            var tooltipTheme = canvas.data('tooltip-theme');
            var showlabel = (canvas.data('labels') && canvas.data('labels').split(',').length > 0) ? true : false;

            var color = colors[0] ? colors[0] : '#4C84FE';
            var background = 'rgba(255,255,255,0)';

            if (colors[1] && colors[2]) {
                var height = parseInt(canvas.attr('height')) + 5;
                var background = canvas[0].getContext('2d').createLinearGradient(0, 0, 0, height);
                background.addColorStop(0, colors[1]);
                background.addColorStop(1, colors[2]);
            } else if (colors[1]) {
                background = colors[1] ? colors[1] : colors[0];
            }

            var data = {
                labels: showlabel ? canvas.data('labels').split('|') : values,
                datasets: [{
                    data: values,
                    fill: colors[1] ? true : false,
                    backgroundColor: background,
                    borderColor: color,
                    pointRadius: 0,
                    borderWidth: border,
                    pointHitRadius: 50,
                    pointHoverBorderColor: 'white',
                    pointHoverBackgroundColor: color,
                    pointHoverBorderWidth: 3,
                    pointHoverRadius: 6
                }]
            };

            var options = {
                animation: { duration: 500 },
                legend: { display: false },
                scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] },
                tooltips: {
                    enabled: false,
                    intersect: true,
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return showlabel ? tooltipItem[0].label : false;
                        },
                        label: function(tooltipItem, data) {
                            return mstocks.priceFormat(tooltipItem.value, currency);
                        }
                    },
                    custom: function(tooltip) {

                        // Tooltip Element
                        var theme = $(this._chart.canvas).data('tooltip-theme');
                        var tooltipEl = $('.chartjs-tooltip-' + theme)[0];
                
                        // Hide if no tooltip
                        if (tooltip.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }
                
                        // Set caret Position
                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltip.yAlign) {
                            tooltipEl.classList.add(tooltip.yAlign);
                        } else {
                            tooltipEl.classList.add('no-transform');
                        }
                
                        function getBody(bodyItem) {
                            return bodyItem.lines;
                        }
                
                        // Set Text
                        if (tooltip.body) {
                            var titleLines = tooltip.title || [];
                            var bodyLines = tooltip.body.map(getBody);
                
                            var innerHtml = '<thead>';
                
                            titleLines.forEach(function(title) {
                                innerHtml += '<tr><th>' + title + '</th></tr>';
                            });
                            innerHtml += '</thead><tbody>';
                
                            bodyLines.forEach(function(body, i) {
                                var pointer = (colors[2] ? colors[2] : (colors[1] ? colors[1] : colors[0]));
                                var style = 'background:' + (pointer != '' ? pointer : '#4C84FE');
                                var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                                innerHtml += '<tr><td>' + span + body + '</td></tr>';
                            });
                            innerHtml += '</tbody>';
                
                            var tableRoot = tooltipEl.querySelector('table');
                            tableRoot.innerHTML = innerHtml;
                        }
                
                        var positionY = $(this._chart.canvas).offset().top - $(window).scrollTop();
                        var positionX = $(this._chart.canvas).offset().left;
                
                        // Display, position, and set styles for font
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
                    }
                },
                hover: { mode: 'nearest', intersect: true },
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 1,
                        bottom: 1
                    }
                }
            };

            if ($('.chartjs-tooltip-' + tooltipTheme).length == 0) {
                $('body').append('<div class="chartjs-tooltip chartjs-tooltip-' + tooltipTheme + '"><table></table></div>');
            }
            
            var chart = new Chart(canvas[0].getContext("2d"), { type: "line", data: data, options: options });
    
        });
    
    }

    $('.msw-ticker-vertical').on('view', function() {
        var self = $(this);
        var id = self.closest('.msw-box').attr('id');
        var scrollDiv = self.find('.cc-ticker');

        var stockswidth = 0;
        var stockslength = 0;
        var width = self.width();
        if (self.hasClass('msw-ticker-init') == false) {
            self.find('.cc-stock').each(function() {
                stockswidth += $(this).outerWidth();
            });
            stockslength = self.find('.cc-stock').length;
        } else {
            stockswidth = mswTickers[id]['w'];
            stockslength = mswTickers[id]['l'];
        }

        var stockwidth = stockswidth / (stockslength > 0 ? stockslength : 1);
        var columns = Math.max(Math.floor(width / (stockwidth > 0 ? stockwidth : 1 )), 1);
        if (self.hasClass('msw-ticker-init') == false) {
            mswTickers[id] = [];
            mswTickers[id]['d'] = self.find('.msw-ticker-stats').clone();
            mswTickers[id]['h'] = self.find('.msw-ticker-stats').height();
            mswTickers[id]['l'] = stockslength;
            mswTickers[id]['w'] = stockswidth;
            scrollDiv.css('height', self.find('.msw-ticker-stats').height());
            scrollDiv.empty().html('<div class="msw-ticker-stats"></div><div class="msw-ticker-stats"></div>');
            self.addClass('msw-ticker-init');
        }

        var cur = 1;
        var targetel = mswTickers[id]['d'].find('> a').length > 0 ? 'a' : 'div';

        var items = mswTickers[id]['d'].find('> '+targetel+'').length;
        var multiple = (items % columns != 0) ? items * columns : items;

        clearInterval(mswTickers[id]['i']);

        var scroller = function() {
            var html = '';

            for (var i = cur; i < (cur + columns); i++) {
                var child = (i % items == 0) ? items : (i % items);
                html += mswTickers[id]['d'].find('> '+targetel+':nth-child(' + child + ')')[0].outerHTML;
            }

            scrollDiv.find('.msw-ticker-stats:last').empty().html(html);

            self.find('.msw-inline-chart').each(function() {
                $(this).mswDrawChart();
            });
            
            scrollDiv.stop().animate({ scrollTop: mswTickers[id]['h'] }, 400, 'swing', function(){
                $(this).scrollTop(0).find('.msw-ticker-stats:last').after($('.msw-ticker-stats:first', this));
            });

            cur = ((cur - 1) == (multiple - columns)) ? 1 : (cur + columns);
        }

        scroller();

        var speed = self.data('speed');
        var duration = 2;

        if (speed === 200) {
            duration = 0;
        } else if (speed > 100) {
            speed = speed - 100;
            speed = (speed / 100) * columns;
            duration = duration - speed;
        } else if (speed < 100) {
            speed = 100 - speed;
            speed = (speed / 10) * columns;
            duration = duration + speed;
        }

        if (speed !== 0) {
            mswTickers[id]['i'] = setInterval(scroller, duration * 1000);
        }
        self.css('visibility', 'visible');

        if (self.hasClass('msw-header')) {
            $('body').css('padding-top', mswTickers[id]['h'] + 'px');
            $('#wpadminbar').css('margin-top', mswTickers[id]['h'] + 'px');
        }

    });

    $('.msw-ticker-horizontal').on('view', function() {

        var ticker = $(this);
        var row = $(this).find('.msw-ticker-stats');
        if(!row.find('.cc-stock').length > 0) return;

        var listWidth = 0;

        row.find('.cc-stock').each(function() {
            listWidth += $(this).innerWidth();
        });

        var clonedElem = row.find('.cc-stock');
        var mult = row.innerWidth() / (listWidth > 0 ? listWidth : 1);

        row.append('<div class="cc-dup"></div>');

        if(mult > 0.5){
            row.find('.cc-dup').append(clonedElem.multiply(Math.ceil(mult)));
        } else {
            row.find('.cc-dup').append(clonedElem.multiply(1));
        }

        row.css('width', listWidth);

        row.find('.msw-inline-chart').each(function() {
            $(this).mswDrawChart();
        });

        var itemcount = row.find('.cc-stock').length;
        var itemsize = listWidth / (itemcount > 0 ? itemcount : 1);

        var speed = $(this).closest('.msw-ticker').data('speed');
        var duration = itemsize * 10;
        
        if (speed === 200) {
            duration = 10;
        } else if (speed == 0) {
            duration = 0;
        } else if (speed > 100) {
            speed = speed - 100;
            speed = (speed / 10) * itemsize;
            duration = duration - speed;
        } else if (speed < 100) {
            speed = 100 - speed;
            speed = (speed / 10) * (itemsize * 8);
            duration = duration + speed;
        }

        var speed = (itemcount * duration) / 1000;
        row.css('animation-duration',  speed + 's');

        ticker.css('visibility', 'visible');
        
        if (ticker.hasClass('msw-header')) {
            $('body').css('padding-top', ticker.height() + 'px');
            $('#wpadminbar').css('margin-top', ticker.height() + 'px');
        }

    });

    $(window).on('load', function() {
        $('.msw-ticker').each(function() {
            $(this).trigger('view');
        });
    });

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    var resizeTickers = debounce(function() {
        $('.msw-ticker-vertical').each(function() {
            $(this).trigger('view');
        });
    }, 500);
    
    window.addEventListener('resize', resizeTickers);

    $.fn.mswChart = function() {

        if (this.length === 0) {
            return;
        }

        var self = $(this);

        depp.require(['msw-echarts', 'msw-tinycolor'], function() {

            var data = {};

            var breakpoint = 360;

            var periods = ['1d', '5d', '1mo', '6mo', '1y', '5y'];

            var opts = self.data('opts');

            opts = $.extend({ id: 'AAPL', symbol: 'AAPL', name: 'Apple, Inc.', currency: 'USD', type: 'line', theme: 'light', period: '1d', toolbox: true, gradient: true, }, opts);
    
            var themes = {
                light: {
                    textColor: (opts.textcolor == '') ? '#222' : opts.textcolor,
                    backgroundColor: (opts.bgcolor == '') ? '#fff' : opts.bgcolor,
                    tooltipColor: '#3A414F',
                    chartColor: (opts.chartcolors[0] == '') ? '#5274D6' : opts.chartcolors[0],
                    chartColors: ['rgba(108,130,145,0.2)', '#14b143', '#ef232a']
                },
                dark: {
                    textColor: (opts.textcolor == '') ? '#f2f2f2': opts.textcolor,
                    backgroundColor: (opts.bgcolor == '') ? '#202328' : opts.bgcolor,
                    tooltipColor: '#3A414F',
                    chartColor: (opts.chartcolors[0] == '') ? '#5274D6' : opts.chartcolors[0],
                    chartColors: ['rgba(108,130,145,0.2)', '#14b143', '#ef232a']
                }
            }
    
            var theme = themes[opts.theme];

            var getOptions = function() {
    
                var options = {
                    color: theme.chartColors,
                    backgroundColor: theme.backgroundColor,
                    textStyle: { color: theme.textColor, fontFamily: (opts.font == 'inherit') ? self.css('font-family') : opts.font },
                    title: {
                        text: opts.symbol,
                        subtext: opts.name,
                        textStyle: {
                            color: theme.textColor
                        },
                        padding: 15
        
                    },
                    tooltip: {
                        trigger: 'axis',
                        confine: true,
                        backgroundColor: theme.tooltipColor,
                        formatter: function (params) {

                            var tooltip = params[0].name;
    
                            if (opts.type == 'line') {
                                tooltip += '<br/>';
                                tooltip += params[0].marker + mstocks.priceFormat(params[0].value, opts.currency);
                            } else {
                                tooltip += '<br/>';
                                tooltip += params[0].marker + "open: " + mstocks.priceFormat(params[0].value[1], opts.currency) + "<br/>";
                                tooltip += params[0].marker + "close: " + mstocks.priceFormat(params[0].value[2], opts.currency) + "<br/>";
                                tooltip += params[0].marker + "high: " + mstocks.priceFormat(params[0].value[4], opts.currency) + "<br/>";
                                tooltip += params[0].marker + "low: " + mstocks.priceFormat(params[0].value[3], opts.currency) + "<br/>";
                                tooltip += params[1].marker + 'volume: ' + mstocks.priceFormat(params[1].value, opts.currency);
                            }
    
                            return tooltip;
                        }
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        left: 15,
                        right: 15,
                        top: (opts.toolbox && self.width() < breakpoint) ? 110 : 80,
                        bottom: 20,
                        containLabel: true
                    },
                    xAxis: [],
                    yAxis: [],
                    series: [],
                    dataZoom: []
                }

                if (opts.toolbox) {

                    options.toolbox = {
                        show: true,
                        top: (self.width() > breakpoint) ? 10 : 60,
                        left: (self.width() > breakpoint) ? 'auto' : 10,
                        right: (self.width() > breakpoint) ? 10 : 'auto',
                        itemSize: 40,
                        showTitle: false,
                        feature: {
                            myTool1: {
                                show: true,
                                icon: 'image://' + mstocks.url + 'assets/public/img/chart/1d-' + opts.theme + '.svg',
                                iconStyle: { opacity: 0.3 },
                                onclick: function () { changeData('1d'); }
                            },
                            myTool2: {
                                show: true,
                                icon: 'image://' + mstocks.url + 'assets/public/img/chart/5d-' + opts.theme + '.svg',
                                iconStyle: { opacity: 0.3 },
                                onclick: function () { changeData('5d'); }
                            },
                            myTool3: {
                                show: true,
                                icon: 'image://' + mstocks.url + 'assets/public/img/chart/1mo-' + opts.theme + '.svg',
                                iconStyle: { opacity: 0.3 },
                                onclick: function () { changeData('1mo'); }
                            },
                            myTool4: {
                                show: true,
                                icon: 'image://' + mstocks.url + 'assets/public/img/chart/6mo-' + opts.theme + '.svg',
                                iconStyle: { opacity: 0.3 },
                                onclick: function () { changeData('6mo'); }
                            },
                            myTool5: {
                                show: true,
                                icon: 'image://' + mstocks.url + 'assets/public/img/chart/1y-' + opts.theme + '.svg',
                                iconStyle: { opacity: 0.3 },
                                onclick: function () { changeData('1y'); }
                            },
                            myTool6: {
                                show: true,
                                icon: 'image://' + mstocks.url + 'assets/public/img/chart/5y-' + opts.theme + '.svg',
                                iconStyle: { opacity: 0.3 },
                                onclick: function () { changeData('5y'); }
                            },
                        },
                        iconStyle: {
                            opacity: 0.3
                        },
                        emphasis: {
                            iconStyle: {
                                opacity: 1
                            }
                        }
                    };

                    options.toolbox.feature['myTool' + (periods.indexOf(opts.period) + 1)]['iconStyle'] = {
                        opacity: 1
                    };

                }
        
                if (opts.type == 'line') {
        
                    options.xAxis.push({
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            showMinLabel: false,
                            showMaxLabel: false
                        }
                    });
                    options.yAxis.push({
                        type: 'value',
                        scale: true,
                        position: 'right',
                        splitLine: {
                            show: true,
                            lineStyle: { color: 'rgba(0,0,0,0.1)', width: 1, type: 'solid' }
                        },
                        axisLabel: {
                            formatter: function (value, index) {
                                return value == 0 ? 0 : mstocks.numberFormat(value, opts.currency);
                            }
                        }
                    });
                    options.series.push({
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: {
                            width: 2
                        },
                        itemStyle: {
                            color: theme.chartColor
                        },
                        areaStyle: (opts.chartcolors[1] && opts.chartcolors[2]) ? {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: opts.chartcolors[1]
                                }, {
                                    offset: 1, color: opts.chartcolors[2]
                                }]
                            },
                            opacity: 1
                        } : {
                            color: opts.chartcolors[1] ? opts.chartcolors[1] : opts.chartcolors[0],
                            opacity: opts.chartcolors[1] ? 1 : 0
                        }
                    });
        
                }
        
                if (opts.type == 'candlestick') {
        
                    options.xAxis.push({
                        type: 'category',
                        boundaryGap: true,
                        axisLabel: {
                            showMinLabel: false,
                            showMaxLabel: false
                        }
                    });
        
                    options.yAxis.push({
                        type : 'value',
                        scale: false,
                        position: 'right',
                        min: 'dataMin',
                        max: 'dataMax',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            showMinLabel: false,
                            formatter: function (value, index) {
                                return value == 0 ? 0 : mstocks.numberFormat(value, opts.currency);
                            }
                        }
                    }, {
                        type : 'value',
                        scale: false,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0,0,0,0.1)',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        }
                    });
        
                    options.series.push({
                        name:'OHLC',
                        type:'candlestick',
                        itemStyle: {
                            normal: {
                                color: theme.chartColors[1],
                                color0: theme.chartColors[2],
                                borderColor: theme.chartColors[1],
                                borderColor0: theme.chartColors[2],
                            }
                        }
                    });
        
                    options.series.push({
                        name: 'Volume',
                        type: 'bar',
                        yAxisIndex: 1
                    });

                    options.dataZoom.push({
                        type: 'inside',
                        xAxisIndex: [0],
                        // startValue : data.length - Math.round(self.width() / 24),
                        // endValue : data.length - 1,
                    });
        
                }

                return options;

            }
    
            var chart = echarts.init(self[0]);
    
            function drawChart() {
    
                chart.showLoading('default', { text: '', maskColor: theme.backgroundColor });
    
                getData(function(res) {

                    data = res;
                    
                    var points = data.filter(function(point) {
                        if (opts.type == 'line') {
                            return point.close;
                        } else {
                            return point.close && point.open;
                        }
                    });

                    var options = getOptions();

                    options.xAxis[0].data = [];
                    options.series[0].data = [];

                    if (opts.type == 'candlestick') {
                        options.series[1].data = [];
                    }
    
                    for (var i = 0; i < points.length; i++) {

                        var label = ('label' in points[i]) ? points[i].label : points[i].date;
                        var open = mstocks.addDecimals(points[i].open, opts.currency);
                        var close = mstocks.addDecimals(points[i].close, opts.currency);
                        var high = mstocks.addDecimals(points[i].high, opts.currency);
                        var low = mstocks.addDecimals(points[i].low, opts.currency);
 
                        if (opts.type == 'line') {
                            options.xAxis[0].data.push(label);
                            options.series[0].data.push(close);
                        }
        
                        if (opts.type == 'candlestick') {
                            options.xAxis[0].data.push(label);
                            options.series[0].data.push([open, close, low, high]);
                            options.series[1].data.push(points[i].volume);
                        }
                    }
    
                    chart.setOption(options);
                    chart.hideLoading();
    
                });
    
            }
    
            function getData(callback) {
    
                $.get(mstocks.ajaxurl, {
                    action: 'msw_chart',
                    symbols: opts.id,
                    period: opts.period,
                    currency: opts.currency,
                    chartCloseOnly: (opts.type == 'candlestick') ? 'false' : 'true'
                }, function(data) {
                    return callback(data[opts.id]['chart-' + opts.period]['points']);
                }, 'json');
    
            }

            function changeData(period) {
                opts.period = period;
                drawChart();
            }

            $(window).on('resize', function() {
                var options = getOptions();
                chart.setOption(options);
                chart.resize();
            });
    
            drawChart();

        });
    }

    $.fn.mswAccordion = function() {

        var self = this;

        self.find('.msw-list-item:eq(0)').addClass('active').find('.msw-list-body').slideDown();

        self.find('.msw-list-header').on('click', function() {
            $(this).parents('.msw-list').find('.msw-list-item').not($(this).parent()).removeClass('active').find('.msw-list-body').slideUp();
            $(this).parent().toggleClass('active');
            $(this).next('.msw-list-body').slideToggle();
        });

    }

    $.fn.mswTable = function () {

        var self = this;
        var breakpoint = 480;
        var table = self.find('.msw-datatable');
        var config = table.data('config');

        var deps = ['msw-datatable'];
        if (config.responsive) { deps.push('msw-datatable-responsive'); } else { deps.push('msw-dragscroll'); }

        depp.require(deps, function () {

            var columns = [];

            table.find('thead th').each(function (index) {

                var column = $(this).data('col');

                columns.push({
                    name: column
                });

            });

            var options = {
                dom: 'r<"loader"><"datatable-scroll dragscroll"t><"loader loader-footer"><"clear">',
                order: [],
                columns: columns,
                pageLength: 100,
                columnDefs: [
                    { targets: 'col-' + columns[0]['data'], className: 'ctrl all' },
                    { targets: 'col-52_week_range', width: '100px', 'max-width': '100px' },
                    { targets: 'col-chart-1d', width: '100px', 'max-width': '100px' },
                    { targets: 'col-chart-5d', width: '100px', 'max-width': '100px' }
                ],
                language: {
                    processing: '',
                    emptyTable: '<div style="text-align: left;">No stocks found.</div>'
                },
                responsive: config.responsive,
                drawCallback: function() {

                    table.find('.msw-inline-chart').each(function() {
                        $(this).mswDrawChart();
                    });

                    table.find('.msw-range-slider').each(function() {
                        $(this).mswRangeSlider();
                    });

                },
                initComplete: function(oSettings) {

                    var datatable = this;

                    if (!config.responsive) {
                        table.find('.datatable-scroll').attr('nochilddrag', 'true').addClass('dragscroll');
                        dragscroll.reset();
                    }

                }
            };

            var tabledt = table.DataTable(options);

            tabledt.on('responsive-display', function (e) {
                $(e.currentTarget).find('td.child .msw-inline-chart').each(function() {
                    $(this).mswDrawChart();
                });
                $(e.currentTarget).find('.msw-range-slider').each(function() {
                    $(this).mswRangeSlider();
                });
            });

        });

    }

    $.fn.mswRangeSlider = function() {

        var self = $(this);
        var currency = self.data('currency');

        depp.require('msw-rangeslider', function() {

            var input = self.find('input');
            var colors = ['#f00', 'orange', '#06a076'];
            var value = input.val(), min = input.attr('min'), max = input.attr('max');

            input.rangeslider({
                polyfill: false,
                onInit: function() {
                    var percent = (value - min) * 100 / ((max - min) > 0 ? (max - min) : 1);
                    var color = (percent > 66) ? colors[2] : (percent > 33) ? colors[1] : colors[0];
                    $(this.$handle).html(mstocks.priceFormat(value, currency));
                    $(this.$fill).css('background', color);
                    $(this.$handle).css('background', color);
                    $(this.$range).append('<div class="range-min">' + mstocks.priceFormat(min, currency) + '</div><div class="range-max">' + mstocks.priceFormat(max, currency) + '</div>');
                }
            });
            input.rangeslider('update', true);

        });
    }

    $.fn.mswResize = function() {
        var self = this;
        var breakpoint = 'msw-xs msw-sm msw-md msw-lg msw-xl';
        var width = self.width();

        if (width >= 1200) {
            breakpoint = 'msw-xl';
        } else if (width >= 992) {
            breakpoint = 'msw-lg msw-xl';
        } else if (width >= 768) {
            breakpoint = 'msw-md msw-lg msw-xl';
        } else if (width >= 576) {
            breakpoint = 'msw-sm msw-md msw-lg msw-xl';
        }

        this.removeClass('msw-xs msw-sm msw-md msw-lg msw-xl').addClass(breakpoint).attr('data-width', width);
        this.removeClass('msw-hidden');
    }

    $.fn.mswSearch = function() {

        var self = this;
        var input = self.find('input');

        var depps = ['msw-typeahead'];

        depp.require(depps, function() {

            self.find('input').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                name: 'stocks',
                display: function(item) {
                    return item.name;
                },
                source: new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: mstocks.ajaxurl + '?action=msw_search_stocks&id=' + self.attr('id').split('-')[1] + '&query=%QUERY',
                        wildcard: '%QUERY',
                        prepare: function(query, settings){
                            $('.msw-search .search-icon').addClass('search-load');
                            settings.url = mstocks.ajaxurl+'?action=msw_search_stocks&id=' + self.attr('id').split('-')[1] + '&query=' + query;
                            return settings;
                        },
                        filter: function(data){
                            $('.msw-search .search-icon').removeClass('search-load');
                            return data.data;
                        }
                    }
                }),
                templates: {
                    suggestion: function(data) {
                        var html = '';
    
                        html += '<p>';
                        html += data.link ? '<a href="' + data.link + '" class="prelink">' : '<span class="prelink">';
                        html += '<b class="stocksymbol">' + data.symbol + '</b>';
                        html += '<span class="stockname">' + data.name + '</span>';
                        html += '<small>' + data.type + ' - ' + data.exchange + '</small>';
                        html += data.link ? '</a>' : '</span>';
                        html += '</p>';
    
                        return html;
                    }
                }
            });
    
            input.on('typeahead:open input', function() {
                if (self.find('.tt-dataset p').length > 0) {
                    input.addClass('dropdown-open');
                } else {
                    input.removeClass('dropdown-open');
                }
            });
    
            input.on('typeahead:close', function() {
                input.removeClass('dropdown-open');
            });
    
            input.on('keypress', function(e) {
                if (e.which == 13) {
                    var link = self.find('.tt-suggestion:first-child a').attr('href');
                    var text = self.find('.tt-suggestion:first-child a span.stockname').text();
                    if(typeof link != 'undefined'){
                        window.location = link;
                    }
                }
            });

        });

    }

    $('.msw-box').each(function() {
        $(this).mswResize();
    });

    $(window).resize(function() {
        $('.msw-box').each(function() {
            $(this).mswResize();
        });
    });

    $('.msw-list-toggle').each(function() {
        $(this).mswAccordion();
    });

    $('.msw-chart').each(function(){
        $(this).mswChart();
    });

    $('.msw-table').each(function () {
        $(this).mswTable();
    });

    $('.msw-inline-chart').each(function() {
        $(this).mswDrawChart();
    });

    $('.msw-search').each(function() {
        $(this).mswSearch();
    });

})( jQuery );
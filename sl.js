var jsdom = require('jsdom');

exports.extract = function (html, script, done, res) {
    var params = {
        html: html,
        scripts: [ script ]
    };

    jsdom.env(params, function (err, window) {
        done(scrape(window), res);
    });

    function scrape(window) {
        var $ = window.jQuery;
        var div = $('div#ctl00_FormRegion_MainRegion_ctl00_ResultHolder div');
        var table = $('div#ctl00_FormRegion_MainRegion_ctl00_ShowTrains table.result');
        var match = /Uppdaterat kl ([0-9]+):([0-9]+)/.exec(div.find('div:first').text());
        var updatedHour = match[1];
        var updatedMinute = match[2];
        var updated = updatedHour + ':' + updatedMinute;

        var departures = [
            $.map($(table).first().find('tr'), createDeparture),
            $.map($(table).last().find('tr'), createDeparture)
        ];
        
        var isNorthFirst = departures[0].some(isNorthbound);

        return {
            station: getMatch(/(.+) \(/, div, 'b:first'),
            updated: updated,
            northbound: departures[isNorthFirst ? 0 : 1],
            southbound: departures[isNorthFirst ? 1 : 0]
        };

        function isNorthbound(departure) {
            return /[BM].[lr]sta/.test(departure.destination);
        }

        function getMatch(regExp, parent, selector) {
            var match = regExp.exec(parent.find(selector).text());
            return match ? match[1] : undefined;
        }

        function createDeparture(e) {
            var minutes = getChildText(3, e);

            if (/Nu/.exec(minutes)) {
                minutes = '0 min';
            }

            var remaining = /([0-9:]+) min/.exec(minutes);

            return {
                delayed: false,
                time: remaining ? getDepartureTime() : minutes,
                destination: getChildText(1, e)
            };

            function getDepartureTime() {
                return (updatedHour + ':' + (1 + parseInt(updatedMinute, 10) + parseInt(remaining[1], 10)));
            }

            function getChildText(i, parent) {
                return $(parent).children(':eq(' + i + ')').text().trim();
            }
        }
    }
};

exports.getUri = function (id) {
    return 'http://mobilrt.sl.se/?tt=TRAIN&SiteId=' + id;
};

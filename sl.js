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

        var departures = [
            createDepartures($(table).first().find('tr')),
            createDepartures($(table).last().find('tr'))
        ];
        
        var isNorthFirst = isNorthbound(departures[0]);

        return {
            station: getMatch(/(.+) \(/, div, 'b:first'),
            updated: getMatch(/Uppdaterat kl ([0-9:]+)/, div, 'div:first'),
            northbound: departures[isNorthFirst ? 0 : 1],
            southbound: departures[isNorthFirst ? 1 : 0]
        };

        function isNorthbound(departure) {
            for (var i = 0; i < departure.length; i++) {
                if (/[BM].[lr]sta/.test(departure[i].destination)) {
                    return true;
                }
            }

            return false;
        }

        function getMatch(regExp, parent, selector) {
            var match = regExp.exec(parent.find(selector).text());
            return match ? match[1] : undefined;
        }

        function createDepartures(rows) {
            var r = [];
            for (var i = 0; i < rows.length; i++) {
                r.push(createDeparture(rows[i]));
            }
            return r;
        }

        function createDeparture(e) {
            var delayedTime = /Ny tid ca ([0-9:]+)/.exec(getChildText(2, e));
            return {
                delayed: delayedTime !== null,
                time: delayedTime ? delayedTime[1] : getChildText(0, e),
                destination: getChildText(1, e)
            };

            function getChildText(i, parent) {
                return $(parent).children(':eq(' + i + ')').text().trim();
            }
        }
    }
};

exports.getUri = function (id) {
    return 'http://mobilrt.sl.se/?tt=TRAIN&SiteId=' + id;
};

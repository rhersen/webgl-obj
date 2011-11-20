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
        var table = $('div#ctl00_FormRegion_MainRegion_ctl00_ShowTrains table.result tr');

        return {
            station: getMatch(/(.+) \(/, div, 'b:first'),
            updated: getMatch(/Uppdaterat kl ([0-9:]+)/, div, 'div:first'),
            departures: createDepartures(table)
        };

        function getMatch(regExp, parent, selector) {
            var match = regExp.exec(parent.find(selector).text());
            return match ? match[1] : undefined;
        }

        function createDepartures(table) {
            var r = [];
            for (var i = 0; i < table.length; i++) {
                r.push(createDeparture(table[i]));
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

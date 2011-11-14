var jsdom = require('jsdom');

function extract(html, script, done) {
    var params = {
        html: html,
        scripts: [ script ]
    };

    jsdom.env(params, function (err, window) {
        done(scrape(window));
    });
    
    function scrape(window) {
        var $ = window.jQuery;
        var div = $('div#ctl00_FormRegion_MainRegion_ctl00_ResultHolder div');
        var table = $('div#ctl00_FormRegion_MainRegion_ctl00_ShowTrains table.result tr');

        return {
            station: getMatch(/(.+) \(/, div, 'b:first'),
            updated: getMatch(/Uppdaterat kl ([0-9:]+)/, div, 'div:first'),
            departures: table.map(createDeparture)
        };

        function getMatch(regExp, parent, selector) {
            return regExp.exec(parent.find(selector).text())[1];
        }

        function createDeparture() {
            var delayedTime = /Ny tid ca ([0-9:]+)/.exec(getChildText(2, this));
            return {
                delayed: delayedTime !== null,
                time: delayedTime ? delayedTime[1] : getChildText(0, this),
                destination: getChildText(1, this)
            };

            function getChildText(i, parent) {
                return $(parent).children(':eq(' + i + ')').text().trim();
            }
        }
    }
}

exports.extract = extract;
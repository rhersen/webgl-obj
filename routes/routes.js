exports.clearCache = function (req, res) {
    res.render('clearCache', {
        title:'Cache cleared'
    })
};

exports.webgl = function (req, res) {
    res.render('webgl', {
        title:'WebGL'
    })
};


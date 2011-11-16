/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', {
        title: 'SL',
        stations: [{name: 'Tullinge', id: 9525}, {name: 'Karlberg', id: 9510}]
    })
};

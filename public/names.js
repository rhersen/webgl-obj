exports.abbreviate = function (name) {
    var removals = [/^Upplands /, /^Stockholms /, /^T-/, /amn$/];
    var replacements = [ [/^Väster/, 'V‧'], [/^Flemings/,'F‧'] ];

    return replacements.concat(removals.map(createReplacement)).reduce(replace, name);
    
    function createReplacement(removal) {
        return [removal, ''];
    }

    function replace(name, replacement) {
        return name.replace(replacement[0], replacement[1]);
    }

};

exports.abbreviate = function (name) {
    name = removePrefix("Upplands ", name);
    name = removePrefix("Stockholms ", name);
    name = removePrefix("T-", name);
    name = replacePrefix("Väster", 'V‧', name);
    name = replacePrefix("Flemings", 'F‧', name);
    name = removeSuffix('amn', name);

    return name;

    function removePrefix(prefix, name) {
        return replacePrefix(prefix, '', name);
    }

    function replacePrefix(prefix, replacement, name) {
        var regExp = new RegExp("^" + prefix);
        if (regExp.test(name)) {
            return replacement + name.substring(prefix.length);
        }
        return name;
    }

    function removeSuffix(suffix, name) {
        var regExp = new RegExp(suffix + '$');
        if (regExp.test(name)) {
            return name.substring(0, name.length - suffix.length);
        }
        return name;
    }
};

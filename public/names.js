exports.abbreviate = function (name) {
    if (/hamn$/.test(name)) {
        return name.substring(0, name.length - 3);
    }

    if (/^Upplands /.test(name)) {
        return name.substring(9);
    }

    if (/^Väster/.test(name)) {
        return 'V‧' + name.substring(6);
    }

    return name;
};

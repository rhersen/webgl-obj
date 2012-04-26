var vertices = /^v (.*) (.*) (.*)$/;
var faces = /^f (.*)\/\/(.*) (.*)\/\/(.*) (.*)\/\/(.*)$/;

function pushVertices(line, r) {
    var match = vertices.exec(line);
    if (match) {
        for (var j = 1; j <= 3; j++) {
            r.push(match[j]);
        }
        r.push(1);
    }
}

function pushFaces(line, r) {
    var match = faces.exec(line);
    if (match) {
        for (var j = 1; j <= 5; j += 2) {
            r.push(match[j] - 1);
        }
    }
}

function parse(lines) {
    function getVertices() {
        var r = [];
        for (var i = 0; i < lines.length; i++) {
            pushVertices(lines[i], r);
        }
        return new Float32Array(r);
    }

    function getFaces() {
        var r = [];
        for (var i = 0; i < lines.length; i++) {
            pushFaces(lines[i], r);
        }
        return new Uint16Array(r);
    }

    return { getVertices:getVertices, getFaces:getFaces };
}

exports.parse = parse;

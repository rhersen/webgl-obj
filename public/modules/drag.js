var dragState = false;
var upCallback;

exports.onUp = function (callback) {
    upCallback = callback;
};

exports.send = function (event) {
    if (event.type === 'mousedown') {
        dragState = createDragState(event);
    } else if (event.type === 'mousemove') {
        dragState.move = getClientCoordinates(event);
    } else if (event.type === 'touchstart') {
        dragState = createDragState(getTouchEvent(event));
    } else if (event.type === 'touchmove') {
        dragState.move = getClientCoordinates(getTouchEvent(event));
    } else if (event.type === 'mouseup') {
        handleUpEvent(getClientCoordinates(event));
    } else if (event.type === 'touchend') {
        handleUpEvent(dragState.move);
    }

    function createDragState(e) {
        var c = getClientCoordinates(e);
        return { down: c, move: c };
    }

    function getClientCoordinates(e) {
        return {x: e.clientX, y: e.clientY};
    }

    function getTouchEvent(e) {
        return e.originalEvent.touches.item(0);
    }

    function handleUpEvent(up) {
        var dragged = {x: up.x - dragState.down.x, y: up.y - dragState.down.y};
        dragState = false;
        if (typeof upCallback === 'function') {
            upCallback(dragged);
        }
    }
};

exports.getState = function () {
    if (dragState.move) {
        return {x: dragState.move.x - dragState.down.x, y: dragState.move.y - dragState.down.y};
    } else {
        return false;
    }
};

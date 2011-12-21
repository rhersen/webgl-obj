var drag = require('../public/drag');

describe('drag', function () {
    it('should be inactive before receiving events', function () {
        expect(drag.getState()).toBeFalsy();
    });

    it('should be active after receiving mousedown event', function () {
        down(100, 20);
        expect(drag.getState()).toEqual({x: 0, y: 0});
        up(100, 20);
    });

    it('state should contain movement since down event', function () {
        down(100, 20);
        move(101, 20);
        expect(drag.getState()).toEqual({x: 1, y: 0});
        up(100, 20);
    });

    it('should be active after receiving touchstart event', function () {
        send('touchstart', 100, 20);
        expect(drag.getState()).toEqual({x: 0, y: 0});
        send('touchend', 100, 20);
    });

    it('state should contain movement since touchstart event', function () {
        send('touchstart', 100, 20);
        send('touchmove', 101, 20);
        expect(drag.getState()).toEqual({x: 1, y: 0});
        send('touchend', 100, 20);
    });

    function down(x, y) {
        drag.send({
            type: 'mousedown',
            clientX: x,
            clientY: y
        });
    }

    function move(x, y) {
        drag.send({
            type: 'mousemove',
            clientX: x,
            clientY: y
        });
    }

    function up(x, y) {
        drag.send({
            type: 'mouseup',
            clientX: x,
            clientY: y
        });
    }

    function send(t, x, y) {
        drag.send({
            type: t,
            originalEvent: {
                touches: {
                    item: function () {
                        return { clientX: x, clientY: y }

                    }
                }
            }
        });
    }

    function touchmove(x, y) {
        drag.send({
            type: 'touchmove',
            clientX: x,
            clientY: y
        });
    }

    function touchend(x, y) {
        drag.send({
            type: 'touchend',
            clientX: x,
            clientY: y
        });
    }
});

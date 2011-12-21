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

    it('should invoke up callback', function () {
        var invoked = 0;

        drag.onUp(function (dragged) {
            if (dragged.x === 2 && dragged.y === 0) {
                invoked += 1;
            }
        });

        expect(invoked).toEqual(0);
        down(100, 20);
        expect(invoked).toEqual(0);
        up(102, 20);
        expect(invoked).toEqual(1);
    });

    it('should be active after receiving touchstart event', function () {
        send('touchstart', 100, 20);
        expect(drag.getState()).toEqual({x: 0, y: 0});
        send('touchend');
    });

    it('state should contain movement since touchstart event', function () {
        send('touchstart', 100, 20);
        send('touchmove', 101, 20);
        expect(drag.getState()).toEqual({x: 1, y: 0});
        send('touchend');
    });

    it('should invoke up callback on touchend', function () {
        var invoked = 0;

        drag.onUp(function (dragged) {
            if (dragged.x === 2 && dragged.y === 0) {
                invoked += 1;
            }
        });

        expect(invoked).toEqual(0);
        send('touchstart', 100, 20);
        expect(invoked).toEqual(0);
        send('touchmove', 102, 20);
        send('touchend');
        expect(invoked).toEqual(1);
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
        if (x) {
            drag.send({
                type: t,
                originalEvent: {
                    touches: {
                        item: function () {
                            return { clientX: x, clientY: y };
                        }
                    }
                }
            });
        } else {
            drag.send({
                type: t,
                originalEvent: {
                    touches: {
                        item: function () {
                            return undefined;

                        }
                    }
                }
            });
        }
    }
});

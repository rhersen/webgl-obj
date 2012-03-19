var target = require('../public/modules/drag');

describe('drag', function () {
    it('should be inactive before receiving events', function () {
        expect(target.getState()).toBeFalsy();
    });

    it('should be active after receiving mousedown event', function () {
        down(100, 20);
        expect(target.getState()).toEqual({x: 0, y: 0});
        up(100, 20);
    });

    it('state should contain movement since down event', function () {
        down(100, 20);
        move(101, 20);
        expect(target.getState()).toEqual({x: 1, y: 0});
        up(100, 20);
    });

    it('should invoke up callback', function () {
        var invoked = 0;

        target.onUp(function (dragged) {
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
        expect(target.getState()).toEqual({x: 0, y: 0});
        send('touchend');
    });

    it('should contain movement since touchstart event', function () {
        send('touchstart', 100, 20);
        send('touchmove', 101, 20);
        expect(target.getState()).toEqual({x: 1, y: 0});
        send('touchend');
    });

    it('should invoke up callback on touchend', function () {
        var invoked = 0;

        target.onUp(function (dragged) {
            invoked = dragged;
        });

        expect(invoked).toBeFalsy();
        send('touchstart', 100, 20);
        send('touchmove', 102, 20);
        expect(invoked).toBeFalsy();
        send('touchend');
        expect(invoked).toEqual({ x: 2, y: 0 });
    });

    it('should return zero movement if touchend follows touchstart', function () {
        var invoked = false;

        target.onUp(function (dragged) {
            invoked = dragged;
        });

        expect(invoked).toBeFalsy();
        send('touchstart', 200, 20);
        expect(invoked).toBeFalsy();
        send('touchend');
        expect(invoked).toEqual({ x: 0, y: 0 });
    });

    function down(x, y) {
        target.send({
            type: 'mousedown',
            clientX: x,
            clientY: y
        });
    }

    function move(x, y) {
        target.send({
            type: 'mousemove',
            clientX: x,
            clientY: y
        });
    }

    function up(x, y) {
        target.send({
            type: 'mouseup',
            clientX: x,
            clientY: y
        });
    }

    function send(t, x, y) {
        if (x) {
            target.send({
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
            target.send({
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

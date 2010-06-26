var sys = require('sys'),
    Obj = require('object').Object;

var kTouchMethodBeganBit     = 1 << 0,
    kTouchMethodMovedBit     = 1 << 1,
    kTouchMethodEndedBit     = 1 << 2,
    kTouchMethodCancelledBit = 1 << 3,
    kTouchMethodAllBits      = ( kTouchMethodBeganBit | kTouchMethodMovedBit | kTouchMethodEndedBit | kTouchMethodCancelledBit);

var TouchHandler = Obj.extend({
    delegate: null,
    priority: 0,
    enabledMethods: 0,

    init: function(opts) {
        @super;

        var delegate = opts['delegate'],
            priority = opts['priority'];

        this.set('delegate', delegate);
        this.priority = priority;

    }

});

var StandardTouchHandler = TouchHandler.extend({
    init: function(opts) {
        @super;

        if (this.delegate.touchesBegan) {
            this.enabledMethods |= kTouchMethodBeganBit;
        }
        if (this.delegate.touchesMoved) {
            this.enabledMethods |= kTouchMethodMovedBit;
        }
        if (this.delegate.touchesEnded) {
            this.enabledMethods |= kTouchMethodEndedBit;
        }
        if (this.delegate.touchesCancelled) {
            this.enabledMethods |= kTouchMethodCancelledBit;
        }
    }
});

var TargetedTouchHandler = TouchHandler.extend({
    claimedTouches: null,
    swallowsTouches: false,

    init: function(opts) {
        @super;

        var swallowsTouches = opts['swallowsTouches'];

        this.claimedTouches = [];
        this.swallowsTouches = swallowsTouches;

        if (this.delegate.touchBegan) {
            this.enabledMethods |= kTouchMethodBeganBit;
        }
        if (this.delegate.touchMoved) {
            this.enabledMethods |= kTouchMethodMovedBit;
        }
        if (this.delegate.touchEnded) {
            this.enabledMethods |= kTouchMethodEndedBit;
        }
        if (this.delegate.touchCancelled) {
            this.enabledMethods |= kTouchMethodCancelledBit;
        }
    },

    updateKnownTouches: function(opts) {
        var touches = opts['touches'],
            event   = opts['event'],
            method  = opts['method'],
            unclaim = opts['unclaim'];


    }
    
});

exports.TouchHandler = TouchHandler;
exports.StandardTouchHandler = StandardTouchHandler;
exports.TargetedTouchHandler = TargetedTouchHandler;
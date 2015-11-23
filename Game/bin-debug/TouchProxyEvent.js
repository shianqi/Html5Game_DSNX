var TouchProxyEvent = (function (_super) {
    __extends(TouchProxyEvent, _super);
    function TouchProxyEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=TouchProxyEvent;p=c.prototype;
    TouchProxyEvent.UP = "UP";
    TouchProxyEvent.DOWN = "DOWN";
    TouchProxyEvent.LEFT = "LEFT";
    TouchProxyEvent.RIGHT = "RIGHT";
    TouchProxyEvent.RIGHT_UP = "RIGHT_UP";
    TouchProxyEvent.RIGHT_DOWN = "RIGHT_DOWN";
    TouchProxyEvent.LEFT_UP = "LEFT_UP";
    TouchProxyEvent.LEFT_DOWN = "LEFT_DOWN";
    TouchProxyEvent.TAB = "TAB";
    TouchProxyEvent.POINT_THREE = "POINT_THREE";
    TouchProxyEvent.POINT_TWO = "POINT_TWO";
    TouchProxyEvent.POINT_FOUR = "POINT_FOUR";
    return TouchProxyEvent;
})(egret.Event);
egret.registerClass(TouchProxyEvent,"TouchProxyEvent");

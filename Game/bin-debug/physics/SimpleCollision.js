var physics;
(function (physics) {
    var SimpleCollision = (function () {
        function SimpleCollision(self, other, normal, impact, type) {
            if (type === void 0) { type = 0; }
            this.type = 0;
            this.self = self;
            this.other = other;
            this.normal = normal;
            this.impact = impact;
            this.type = type;
        }
        var d = __define,c=SimpleCollision;p=c.prototype;
        SimpleCollision.BEGIN = 0;
        SimpleCollision.PERSIST = 1;
        return SimpleCollision;
    })();
    physics.SimpleCollision = SimpleCollision;
    egret.registerClass(SimpleCollision,"physics.SimpleCollision");
})(physics || (physics = {}));

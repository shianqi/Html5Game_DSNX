var physics;
(function (physics) {
    var StaticPhysicsObject = (function (_super) {
        __extends(StaticPhysicsObject, _super);
        function StaticPhysicsObject(width, height) {
            _super.call(this, width, height);
        }
        var d = __define,c=StaticPhysicsObject;p=c.prototype;
        return StaticPhysicsObject;
    })(physics.SimplePhysicsObject);
    physics.StaticPhysicsObject = StaticPhysicsObject;
    egret.registerClass(StaticPhysicsObject,"physics.StaticPhysicsObject");
})(physics || (physics = {}));

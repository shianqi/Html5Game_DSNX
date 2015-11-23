var physics;
(function (physics) {
    var DynamicPhysicsObject = (function (_super) {
        __extends(DynamicPhysicsObject, _super);
        function DynamicPhysicsObject(width, height) {
            _super.call(this, width, height);
            this.mass = 1;
        }
        var d = __define,c=DynamicPhysicsObject;p=c.prototype;
        return DynamicPhysicsObject;
    })(physics.SimplePhysicsObject);
    physics.DynamicPhysicsObject = DynamicPhysicsObject;
    egret.registerClass(DynamicPhysicsObject,"physics.DynamicPhysicsObject");
})(physics || (physics = {}));

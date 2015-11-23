var physics;
(function (physics) {
    var SimplePhysicsScene = (function () {
        function SimplePhysicsScene() {
            this._len = 0;
            this._gravity = 0.01;
            this._solver = new physics.SimplePhysicsSolver(this);
            this._objs = new Array();
            this.collide(physics.DynamicPhysicsObject, physics.StaticPhysicsObject);
        }
        var d = __define,c=SimplePhysicsScene;p=c.prototype;
        d(p, "gravity"
            ,function () {
                return this._gravity;
            }
            ,function (value) {
                this._gravity = value;
            }
        );
        p.add = function (obj) {
            this._objs.push(obj);
            this._len++;
            if (this._debugShow) {
                obj.debugContainer = this._debugContainer;
                obj.showDebug = true;
            }
        };
        p.remove = function (obj) {
            var index = this._objs.indexOf(obj);
            if (index != -1) {
                this._objs.splice(index, 1);
                this._len--;
            }
            if (this._debugShow) {
                obj.showDebug = false;
            }
        };
        p.collide = function (dynamicObjectType, staticObjectType) {
            this._solver.collide(dynamicObjectType, staticObjectType);
        };
        p.overlap = function (typeA, typeB) {
            this._solver.overlap(typeA, typeB);
        };
        p.getObjectsByType = function (type) {
            var r = new Array();
            for (var i = 0; i < this._len; i++) {
                if (this._objs[i] instanceof type) {
                    r.push(this._objs[i]);
                }
            }
            return r;
        };
        d(p, "tickEnable",undefined
            /* INTERFACE gemini.component.ITick */
            ,function (value) {
                this._tickEnable = value;
            }
        );
        p.tick = function (intervalTime) {
            if (intervalTime === void 0) { intervalTime = 0; }
            var temp;
            for (var i = 0; i < this._len; i++) {
                temp = this._objs[i];
                if (temp.mass > 0) {
                    temp.velocity.y += this._gravity;
                }
                temp.x += temp.velocity.x * intervalTime;
                temp.y += temp.velocity.y * intervalTime;
            }
            this._solver.tick(intervalTime);
        };
        p.showDebug = function (parent) {
            this._debugContainer = parent;
            this._debugShow = true;
        };
        return SimplePhysicsScene;
    })();
    physics.SimplePhysicsScene = SimplePhysicsScene;
    egret.registerClass(SimplePhysicsScene,"physics.SimplePhysicsScene");
})(physics || (physics = {}));

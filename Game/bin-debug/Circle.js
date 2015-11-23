var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        _super.call(this);
        this._radio = Circle.SIZE;
    }
    var d = __define,c=Circle;p=c.prototype;
    Circle.create = function () {
        //操作提示的按钮
        //if(Circle.allCircles.length > 0)
        //{
        //	return Circle.allCircles.pop();
        //}
        //else
        //{
        //	return new Circle();
        //}
        Circle.allCircles.pop();
        return new Circle();
    };
    d(p, "index"
        ,function () {
            return this._index;
        }
        ,function (i) {
            this._index = i;
            this._bmp.texture = RES.getRes("number" + i);
        }
    );
    p.init = function () {
        this._bmp = new egret.Bitmap();
        this._bmp.width = Circle.SIZE * 2;
        this._bmp.height = Circle.SIZE * 2;
        this._bmp.x = -Circle.SIZE;
        this._bmp.y = -Circle.SIZE;
        this.addChild(this._bmp);
    };
    p.destroy = function () {
        this.visible = true;
        Circle.allCircles.push(this);
    };
    Circle.SIZE = 30;
    Circle.allCircles = [];
    return Circle;
})(egret.Sprite);
egret.registerClass(Circle,"Circle");

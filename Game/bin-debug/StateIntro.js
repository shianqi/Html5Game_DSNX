var StateIntro = (function (_super) {
    __extends(StateIntro, _super);
    function StateIntro() {
        _super.call(this);
        if (this.stage) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
    }
    var d = __define,c=StateIntro;p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    p.init = function () {
        //游戏介绍界面，只有一个开始按钮和一个背景
        this._btnStart = new egret.Sprite();
        this._btnStart.graphics.beginFill(0xffff00);
        this._btnStart.graphics.drawRect(0, 0, 200, 100);
        this._btnStart.graphics.endFill();
        this._btnStart.width = 200;
        this._btnStart.height = 100;
        this._btnStart.touchEnabled = true;
        this._btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this._btnStart.x = (this.stage.stageWidth - 200) / 2;
        this._btnStart.y = (this.stage.stageHeight - 100) / 2;
        //this.addChild(this._btnStart);
        this._bg = new egret.Bitmap();
        this._bg.texture = RES.getRes("startPage");
        this._bg.width = this.stage.stageWidth;
        this._bg.height = this.stage.stageHeight;
        this._bg.touchEnabled = true;
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.addChild(this._bg);
    };
    p.tapHandler = function (e) {
        //在界面上点击下，就开始游戏啦
        this.dispatchEvent(new egret.Event("GameStart"));
    };
    return StateIntro;
})(egret.DisplayObjectContainer);
egret.registerClass(StateIntro,"StateIntro");

var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        _super.call(this);
        if (this.stage) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
    }
    var d = __define,c=MainUI;p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    p.init = function () {
        this._txtScoreT = new egret.TextField();
        this._txtScore = new egret.TextField();
        this._txtLastJumpT = new egret.TextField();
        this._txtLastJump = new egret.TextField();
        this._txtScoreT.text = "技能值：";
        this._txtScore.text = "0";
        this._txtLastJumpT.text = "剩余跳跃：";
        this._txtLastJump.text = "20";
        this._txtScore.x = 140;
        this._txtLastJumpT.y = 30;
        this._txtLastJump.y = 30;
        this._txtLastJump.x = 140;
        this.addChild(this._txtScoreT);
        this.addChild(this._txtScore);
        this.addChild(this._txtLastJumpT);
        this.addChild(this._txtLastJump);
        this._score = 0;
        this.score = 0;
        this.jump = 20; //xian  shi  jump num
    };
    d(p, "score"
        ,function () {
            return this._score;
        }
        ,function (s) {
            this._score += s;
            this._txtScore.text = this._score.toString();
            MainUI.totalScore = this._score;
        }
    );
    d(p, "jump",undefined
        ,function (j) {
            this._jump = j;
            this._txtLastJump.text = this._jump.toString();
        }
    );
    MainUI.totalScore = 0;
    return MainUI;
})(egret.DisplayObjectContainer);
egret.registerClass(MainUI,"MainUI");

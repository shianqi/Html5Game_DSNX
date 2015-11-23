var StateOver = (function (_super) {
    __extends(StateOver, _super);
    function StateOver() {
        _super.call(this);
        this.input_judges = false;
        if (this.stage) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
    }
    var d = __define,c=StateOver;p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.input_username();
        // this.init();
    };
    p.input_username = function () {
        this._container = new egret.Sprite;
        this._bg = new egret.Bitmap();
        this._bg.texture = RES.getRes("overPage");
        this._bg.width = this.stage.stageWidth;
        this._bg.height = this.stage.stageHeight;
        this.addChild(this._bg);
        this.username = new egret.Bitmap();
        this.username.texture = RES.getRes("overPage_name");
        this.username.width = this.stage.width;
        this.username.height = this.stage.height;
        this.addChild(this.username);
        this._text_input = new egret.TextField();
        this._text_input.type = egret.TextFieldType.INPUT;
        //username
        this._text_input.width = this.stage.width / 2;
        this._text_input.textColor = 0;
        this._text_input.textAlign = egret.HorizontalAlign.CENTER;
        this._text_input.height = 50;
        this._text_input.x = this.stage.width / 2 - this._text_input.width / 2;
        this._text_input.y = this.stage.height / 3;
        this.layTxBg(this._text_input);
        this._container.addChild(this._text_input);
        this.addChild(this._container);
        this.sure_picture = new egret.Bitmap();
        this.sure_picture.texture = RES.getRes("sure");
        this.sure_picture.x = this.stage.width / 2 - this.sure_picture.width / 2;
        this.sure_picture.y = this.stage.height / 2;
        this.addChild(this.sure_picture);
        this.sure_picture.touchEnabled = true;
        this.sure_picture.addEventListener(egret.TouchEvent.TOUCH_TAP, this.init, this);
    };
    p.layTxBg = function (tx) {
        var shp = new egret.Shape;
        shp.graphics.beginFill(0xffe000);
        shp.graphics.drawRect(tx.x, tx.y, tx.width, tx.height);
        shp.graphics.endFill();
        this._container.addChild(shp);
    };
    p.init = function () {
        //username judge


        if (this._text_input.text != "") {
            //http
            var score=MainUI.totalScore.toString();
            var username=this._text_input.text;
            $.get("http://115.28.72.26/imudges/imudgesGame.php?username="+username+"&score="+score+"+",function(result,status){
                if(status!="success"){
                    alert("网络似乎出了点小问题，请稍后尝试");
                }
            });



            //游戏结束界面
            var stageW = this.stage.stageWidth;
            var stageH = this.stage.stageHeight;
            //this._bg = new egret.Bitmap();
            //this._bg.texture = RES.getRes("overPage");
            //this._bg.width = this.stage.stageWidth;
            //this._bg.height = this.stage.stageHeight;
            //this._bg.touchEnabled = true;
            //this.stage.touchEnabled=false;
            this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
            this.addChild(this._bg);
            var txt1 = new egret.TextField();
            txt1.textColor = 0x000000;
            txt1.textAlign = egret.HorizontalAlign.RIGHT;
            txt1.width = 160;
            txt1.size = 60;
            txt1.text = "      ";
            txt1.x = this.stage.width / 3;
            txt1.y = 385;
            txt1.touchEnabled = true;
            txt1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
            this.addChild(txt1);
            //显示得分
            this._txt = new egret.TextField();
            this._txt.textColor = 0x000000;
            this._txt.textAlign = egret.HorizontalAlign.RIGHT;
            this._txt.width = 300;
            this._txt.size = 60;
            this._txt.text = MainUI.totalScore.toString();
            //score
            this._txt.x = 0;
            this._txt.y = 200;
            this.addChild(this._txt);
            this._txtTitle = new egret.TextField();
            this._txtTitle.textColor = 0x000000;
            this._txtTitle.textAlign = egret.HorizontalAlign.CENTER;
            this._txtTitle.width = 200;
            this._txtTitle.size = 30;
            this._txtTitle.text = this.getTitle();
            this._txtTitle.x = (stageW - this._txtTitle.width) / 2;
            this._txtTitle.y = 325;
            this.addChild(this._txtTitle);
        }
        else
            this.input_username();
    };
    p.tapHandler = function (e) {
        this.dispatchEvent(new egret.Event("GameStart"));
    };
    p.getText = function () {
        //根据得分计算打败了全国的多少玩家
        //并且结算获得了什么称号
        //其实都是随机的，作者太懒了-_-|||
        var rank = 68.9;
        //MainUI.totalScore = 1100;
        if (MainUI.totalScore > 1500) {
            rank = Math.random() * 10.00 + 90.00;
        }
        else if (MainUI.totalScore > 1000) {
            rank = Math.random() * 10.00 + 80.00;
        }
        else if (MainUI.totalScore > 500) {
            rank = Math.random() * 10.00 + 70.00;
        }
        else {
            rank = Math.random() * 10.00 + 60.00;
        }
        if (MainUI.totalScore == 0) {
            rank = 0;
        }
        rank = Math.floor(rank * 100) / 100;
        //rank = rank/100;
        return "恭喜你获得了总分\n" + MainUI.totalScore.toString() + "\n击败了全国" + rank.toString() + "%的玩家" + "\n获得了称号\n“" + this.getTitle() + "”";
    };
    p.getTitle = function () {
        var a = ["大屌丝", "死宅", "苦逼程序猿", "牛逼的项目经理", "CEO", "人生巅峰"];
        if (MainUI.totalScore < 50) {
            return a[0];
        }
        else {
            if (MainUI.totalScore < 100) {
                return a[1];
            }
            else {
                if (MainUI.totalScore < 200) {
                    return a[2];
                }
                else {
                    if (MainUI.totalScore < 300) {
                        return a[3];
                    }
                    else {
                        if (MainUI.totalScore < 400) {
                            return a[4];
                        }
                        else {
                            return a[5];
                        }
                    }
                }
            }
        }
        //var index = Math.floor(Math.random() * a.length);
        //return a[index];
    };
    return StateOver;
})(egret.DisplayObjectContainer);
egret.registerClass(StateOver,"StateOver");

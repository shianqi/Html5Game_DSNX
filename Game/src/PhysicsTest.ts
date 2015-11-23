class PhysicsTest extends egret.Sprite
{
	
	public static STATE_OPER:number = 1;
	public static STATE_NOOPER:number = 2;
	public static NORMAL_G:number = 0.002;
	public static DOWN_G:number = 0.006;
	public static GROUND_G:number = -0.04;
	public static MAX_JUMP:number = 20;//jump num
	
	private _scene:physics.SimplePhysicsScene;
	private _debugContainer:egret.Sprite;
	private _ground:physics.StaticPhysicsObject;
	private _hero:Hero;
	private _lastTime:number;
	private _touchProxy:TouchProxy;
	private _intervalTime:number;
	private _curTime:number;
	private _groundY:number;
	private _speeds:number[] = [-0.15, -0.2, -0.35];
	private _curSpeedIndex:number;
	private _lowOperY:number;
	private _highOperY:number;
	private _state:number;
	private _opered:boolean;
	private _successed:boolean;
	private _txtScore:egret.TextField;

	private _curLevel:number;
	private _comboo:number;
	private _curJump:number;
	private _ui:MainUI;
	private _bg:egret.Bitmap;
	private _bed:egret.Bitmap;
	private _bedIn:egret.Bitmap;
	private _bedHalf:egret.Bitmap;
	private _txtAdd:egret.TextField;

	public constructor()
	{
		super();

		if(this.stage)
		{
			this.init();
		}
		else
		{
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		
	}

	private onAddToStage(event:egret.Event){
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
    }

    private initUI()
    {
    	this._ui = new MainUI();
    	this.addChild(this._ui);

    }
	private init():void
	{

		var stageW:number = this.stage.stageWidth;
		var stageH:number = this.stage.stageHeight;

		//显示获得了多少得分
		this._txtScore = new egret.TextField();
		this._txtScore.x = (stageW - this._txtScore.width) / 2;
		this._txtScore.y = 200;
		this._txtScore.text = "开始";
		this._txtAdd = new egret.TextField();
		this._txtAdd.textColor = 0xffff00;

		//创建一个物理的场景，在这个场景里的物体可以收到重力的作用
		this._scene = new physics.SimplePhysicsScene();
		this._debugContainer = new egret.Sprite();
		//创建一个地板
		this._ground = new physics.StaticPhysicsObject(stageW, 100);
		this._ground.y = stageH - 100;
		this._ground.x = stageW/2;
		//创建一个蹦蹦床
		this._bed = new egret.Bitmap()
		this._bed.texture = RES.getRes("bed0");
		var sBed:number = 480/640;
		this._bed.scaleX = sBed;
		this._bed.scaleY = sBed;
		this._bed.y = this._ground.y - 100;
		this._bed.x = 90;
		
		//床的里面用于做床的变形用
		this._bedIn = new egret.Bitmap();
		this._bedIn.texture = RES.getRes("bedIn");
		this._bedIn.scaleX = sBed;
		this._bedIn.scaleY = sBed;
		this._bedIn.y = this._ground.y-15 +20;
		this._bedIn.x = 138;
		this._bedIn.height = 1;
		
		this.addChild(this._bed);

		this._opered = true;
		//创建一个主角
		this._hero = new Hero(50,50);
		this._hero.addTo(this._scene,this);
		this._scene.gravity = PhysicsTest.NORMAL_G;
		this._hero.x = stageW/2;
		this._hero.y = 400;
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this._hero.onCollide = this.onCollide;

		this.addChild(this._bedIn);

		//用来做床的变形用
		this._bedHalf = new egret.Bitmap();
		this._bedHalf.texture = RES.getRes("bedHalf");
		this._bedHalf.scaleX = sBed;
		this._bedHalf.scaleY = sBed;
		this._bedHalf.y = this._ground.y - 100;
		this._bedHalf.x = 90;
		this.addChild(this._bedHalf);


		//添加屏幕上的各种手势操作
		this._touchProxy = new TouchProxy();
		this._touchProxy.addEventListener(TouchProxyEvent.DOWN, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.UP, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.LEFT, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.RIGHT, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.RIGHT_UP, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.RIGHT_DOWN, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.LEFT_UP, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.LEFT_DOWN, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.POINT_THREE, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.POINT_TWO, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.POINT_FOUR, this.onTouchDown,this);
		this._touchProxy.addEventListener(TouchProxyEvent.TAB, this.onTouchDown,this);
		this.addChild(this._touchProxy);
		this._curSpeedIndex = 0;
		this._lastTime = egret.getTimer();

		this._groundY = stageH - 200;
		this._lowOperY = this._groundY - 50;
		this._highOperY = 150;
		this._curLevel = 0;
		this._curJump = 0;
		this._comboo = 0;
		this.initUI();
		this.addChild(this._debugContainer);
	}

	/**
	 * 添加得分
	 * @param s 得分
	 * @param co comboo数
	 */
	private addScore(s:number, co:number)
	{
		if(co > 1)
		{
			this._txtAdd.text = "+"+s.toString() + " x" + co.toString() + " Comboo";
		}
		else
		{
			this._txtAdd.text = "+"+s.toString();
		}
		this._txtAdd.alpha = 1;
		this.addChild(this._txtAdd);
		var tw = egret.Tween.get( this._txtAdd );
		this._txtAdd.y = this.stage.stageHeight/2;
		this._txtAdd.x = this.stage.stageWidth/2 - 50;
        tw.to( {y:this.stage.stageHeight/2 - 100, alpha:0}, 3000 );
	}
	private onTouchDown(e:TouchProxyEvent)
	{
		if(this._hero.state == Hero.STATE_GROUND && e.type == TouchProxyEvent.TAB)
		{
			//女神蹦到了床上，这时点击下屏幕给女神加点力量让她跳的更高
			this._curSpeedIndex += 2;
		}
		else if(this._state == PhysicsTest.STATE_OPER && !this._opered)
		{
			//女神跳到了高空，屏幕出现操作提示界面，全部按对了得分，否则失败了不得分
			if(e.type == TouchProxyEvent.TAB)
				return;
			this._opered = true;
			
			if(e.type == this._touchProxy.type)
			{
				this.success();
				this._hero.success();
			}
			else
			{
				this.fail();
			}
			this._touchProxy.hide();
		}
	}
	private success():void
	{
		//成功后得分
		this._successed = true;
		this._txtScore.text ="Success" + "x" + this._comboo.toString() + " jump:" + this._curJump.toString();
		this._curLevel++;
		this._comboo++;
		this._ui.score = this.getScore();
	}
	private fail():void
	{
		//失败了comboo清零
		this._successed = false;
		this._txtScore.text = "Fail" + " jump:" + this._curJump.toString();;
		this._comboo = 0;
	}
	private gameOver():void
	{
		//一共可以跳10次，跳完后游戏结束
		this._txtScore.text = "gameOver";
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.dispatchEvent(new egret.Event("GameOver"));
	}
	private onEnterFrame(e:egret.Event)
	{
		//心跳函数，主要逻辑都在这里处理
		this._curTime = egret.getTimer();
		this._intervalTime = this._curTime - this._lastTime;
		this._lastTime = this._curTime;
		this._scene.tick(18);
		switch(this._hero.state)
		{
			case Hero.STATE_NORMAL://女神的正常状态下
				if(this._hero.velocity.y < 0)//女神向上跳
				{
					this._hero.up();//变下女神的图片，裙子飞上去喽*_*
					this._scene.gravity = PhysicsTest.NORMAL_G;
					if(this._hero.y <= this._lowOperY)//女神飞到空中某个点时开始出现操作提示
					{
						if(!this._opered && this._curSpeedIndex >= 2)
						{
							this._touchProxy.show();
							this._state = PhysicsTest.STATE_OPER;
						}
					}
					if(this._hero.y <= this._highOperY)//女神继续飞到快到最高点的时候操作提示结束
					{
						this._touchProxy.hide();
						this._state = PhysicsTest.STATE_NOOPER;
						if(!this._opered)
						{
							if(!this._successed && this._curSpeedIndex >= 2)
							{
								this.fail();
							}
						}
					}
				}
				else//女神向下飞
				{
					this._hero.down();//换图片，女神裙子下来喽-_-||
					this._scene.gravity = PhysicsTest.DOWN_G;
				}
				if(this._hero.y >= this._groundY)//女神跳到另床上
				{
					this._scene.gravity = PhysicsTest.GROUND_G;
					this._hero.state = Hero.STATE_GROUND;
					this._hero.hideSay();
				}
				break;
			case Hero.STATE_GROUND:
				this._bedIn.height = this._hero.y - this._groundY + 20;
				if(this._hero.velocity.y <=0)//女神跳到床上最低点准备起跳的刹那
				{
					console.log("jump",this._curSpeedIndex)
					this._scene.gravity = PhysicsTest.NORMAL_G;
					this._hero.state = Hero.STATE_JUMP;
					this._curSpeedIndex -= 1;//速度要降一个等级
					if(this._curSpeedIndex > 2)
						this._curSpeedIndex = 2;
					else if(this._curSpeedIndex < 0)
						this._curSpeedIndex = 0;
					this._hero.velocity.y = this._speeds[this._curSpeedIndex];
					if(this._curSpeedIndex >= 2)
					{
						this._opered = false;
					}
					else
					{
						this._comboo = 0;
					}
					this._curJump++; //又跳了一次，记下数
					this._ui.jump = PhysicsTest.MAX_JUMP - this._curJump;
					//达到最大跳跃次数后结束游戏
					if(this._curJump >= PhysicsTest.MAX_JUMP)
					{
						this.gameOver();
					}
					
				}
				break;
			case Hero.STATE_JUMP:
				//女神跳的状态
				if(this._hero.y < this._groundY)
				{
					this._hero.state = Hero.STATE_NORMAL;
				}
				else
				{
					//计算床的形变
					this._bedIn.height = this._hero.y - this._groundY + 20;
				}
				this._touchProxy.type = this.getTouchType(this._curLevel);
				this._successed = false;
				break;
		}
		

	}
	private getScore():number
	{
		var a:number = this._curLevel * 10;
		a += Math.ceil(Math.random() * 3);
		this.addScore(a, this._comboo);
		return a * this._comboo;
	}

	private getTouchType(level:number):string
	{
		//根据目前的等级随机出现操作的提示，划屏或者是点按钮
		if(level < 3)
		{
			var r:number = Math.random();
			if(r > 0.9)
			{
				return TouchProxy.UP;
			}
			else if(r > 0.8)
			{
				return TouchProxy.DOWN;
			}
			else if(r > 0.7)
			{
				return TouchProxy.LEFT;
			}
			else if(r > 0.6)
			{
				return TouchProxy.RIGHT;
			}
			else if(r > 0.45)
			{
				return TouchProxy.LEFT_UP;
			}
			else if(r > 0.3)
			{
				return TouchProxy.LEFT_DOWN;
			}
			else if(r > 0.15)
			{
				return TouchProxy.RIGHT_UP;
			}
			else
			{
				return TouchProxy.RIGHT_DOWN;
			}
		}
		else if(level ==3)
		{
			return TouchProxy.POINT_TWO;
		}
		else if(level ==4)
		{
			return TouchProxy.POINT_THREE;
		}
		else
		{
			return TouchProxy.POINT_FOUR;
		}
	}

	private onCollide(self:physics.SimplePhysicsObject, other:physics.SimplePhysicsObject, normal:egret.Point, impact:number)
	{
		self.velocity.y = -0.2;
	}

}
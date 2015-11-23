class Hero extends physics.DynamicPhysicsObject
{
	public static STATE_NORMAL:number = 0;
	public static STATE_GROUND:number = 1;
	public static STATE_JUMP:number = 2;
	
	public static ACT_DOWN:number = 0;
	public static ACT_UP:number = 1;
	public static ACT_SUCCESS:number = 2;

	private _state:number;

	private _skin:egret.Bitmap;

	private _scene:physics.SimplePhysicsScene;
	private _container:egret.DisplayObjectContainer;

	private _act:number = 0;
	private _speakContainer:egret.Sprite;
	private _txtSpeak:egret.TextField;

	public constructor(width:number, height:number)
	{
		//主角女神
		super(width, height);
		this._state = Hero.STATE_NORMAL;//初始化女神的状态
		this._skin = new egret.Bitmap();
		this._skin.texture = RES.getRes("heroDown");
		var sh:number = 480/640;
		this._skin.scaleX = sh;
		this._skin.scaleY = sh;
		this._skin.x = 165;
		this._speakContainer = new egret.Sprite();
		this._txtSpeak = new egret.TextField;//女神说话的文本框
		this._txtSpeak.textColor = 0x000000;
		this._txtSpeak.textAlign = egret.HorizontalAlign.CENTER;
		this._txtSpeak.size = 18;
		this._speakContainer.addChild(this._txtSpeak);
		this._txtSpeak.y = 1;
		this._speakContainer.x = 200;
		this._skin.touchEnabled = false;
		//乱摸女神可不好哦:);
        this._skin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
	}

	private tapHandler(e:egret.TouchEvent):void
	{
		this.sayDirty();
	}

	private sayDirty()
	{
		//乱摸女神会被骂
		this._txtSpeak.text = "努力学习";
		var w:number = this._txtSpeak.text.length * 18;
		var h:number = 60;
		this._txtSpeak.width = w;

		this._speakContainer.graphics.clear();
		this._speakContainer.graphics.beginFill(0xffffff);
		this._speakContainer.graphics.drawRoundRect(0,0,w,h,30,60);
		this._speakContainer.graphics.endFill();
		if(this._container)
		{
			this._speakContainer.x = (this._container.stage.stageWidth - w)/2;
			this._container.addChild(this._speakContainer);
		}
	}
	public say()
	{
		//女神跳到空中会随机说些话
		this._txtSpeak.text = this.getSay();
		//this._txtSpeak.size=25;
		var w:number = this._txtSpeak.text.length * 18;
		var h:number = 20;
		this._txtSpeak.width = w;

		this._speakContainer.graphics.clear();
		this._speakContainer.graphics.beginFill(0xffffff);
		this._speakContainer.graphics.drawRoundRect(0,0,w,h,20,20);
		this._speakContainer.graphics.endFill();
		if(this._container)
		{
			this._speakContainer.x = (this._container.stage.stageWidth - w)/2;
			this._container.addChild(this._speakContainer);
		}

	}

	public hideSay():void
	{
		if(this._speakContainer.parent)
		{
			this._speakContainer.parent.removeChild(this._speakContainer);
		}
	}
	private getSay():string
    {
    	var a = [
    				"我是苦逼程序员"
    				,"哇~太棒了~升职加薪了"
    				,"再努力点，当上总经理了"
    				,"出任CEO了"
					,"今天又装了一逼"
    				,"哇~迎娶白富美"
					,"人生巅峰上就钱太多了！！"
					,"太好了~获得了老板的表扬"
    				,"亲们，看偶的姿势帅不帅"
    			];
    	var index = Math.floor(Math.random() * a.length);
    	return a[index];
    }

	public addTo(scene:physics.SimplePhysicsScene, container:egret.DisplayObjectContainer)
	{
		this._scene = scene;
		this._container = container;
		scene.add(this);
		container.addChild(this._skin);
		//this.say();
	}
	public set state(s:number)
	{
		if(this._state != s)
		{
			this._state = s;
		}
			
	}
	public get state():number
	{
		return this._state;
	}


	public up()
	{
		//女神向上的状态
		if(this._act != Hero.ACT_UP && this._act != Hero.ACT_SUCCESS)
		{
			this._skin.texture = RES.getRes("heroUp");
			this._act = Hero.ACT_UP;
			this._skin.touchEnabled = false;
		}
		
	}
	public down()
	{
		//女神向下的状态
		if(this._act != Hero.ACT_DOWN)
		{
			this._skin.texture = RES.getRes("heroDown");
			this._act = Hero.ACT_DOWN;
			this.hideSay();
			this._skin.touchEnabled = true;
		}
		
	}
	public success()
	{
		//女神在空中时，按对了操作提示后，女神会有特别的动作
		if(this._act != Hero.ACT_SUCCESS)
		{

			this._act = Hero.ACT_SUCCESS;
			var r:number = Math.random();
			var sk:string = "heroUp";
			if(r > 0.8)
			{
				sk = "heroAct0";
			}
			else if(r > 0.6)
			{
				sk = "heroAct1";
			}
			else if(r > 0.4)
			{
				sk = "heroAct2";
			}
			else if(r > 0.2)
			{
				sk = "heroAct3";
			}
			else
			{
				sk = "heroPre";
			}
			this._skin.texture = RES.getRes(sk);
			this.say();
			this._skin.touchEnabled = false;
		}
		
	}
	public set y(value:number) 
	{
		this._y = value;
		
		if (this._showDebug){
			this._debugShape.y = this._y;
		}

		//if(this._state != Hero.STATE_GROUND)
		{
			this._skin.y = this._y - 50;
			this._speakContainer.y = this._y - 80;
		}
		
	}
	public get y():number {
		return this._y;
	}
}
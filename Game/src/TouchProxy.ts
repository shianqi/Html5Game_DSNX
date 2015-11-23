class TouchProxy extends egret.DisplayObjectContainer
{
	public static UP:string = "UP";
	public static DOWN:string = "DOWN";
	public static LEFT:string = "LEFT";
	public static RIGHT:string = "RIGHT";
	public static RIGHT_UP:string = "RIGHT_UP";
	public static RIGHT_DOWN:string = "RIGHT_DOWN";
	public static LEFT_UP:string = "LEFT_UP";
	public static LEFT_DOWN:string = "LEFT_DOWN";
	public static TAB:string = "TAB";
	public static POINT_THREE:string = "POINT_THREE";
	public static POINT_TWO:string = "POINT_TWO";
	public static POINT_FOUR:string = "POINT_FOUR";

	public static POINT_CONTAINER_SIZE:number = 250;

	private _startX:number;
	private _startY:number;
	private _endX:number;
	private _endY:number;

	private _startStageX:number;
	private _startStageY:number;
	private _endStageX:number;
	private _endStageY:number;

	private _type:string;
	private _view:egret.DisplayObject;
	private _arrow:egret.Sprite;
	private _circleContainer:egret.DisplayObjectContainer;
	private _viewW:number;
	private _viewH:number;
	private _pointCircles:Circle[];
	private _curTabIndex:number;

	public constructor()
	{
		//操作界面的显示
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

	public show()
	{
		if(this._view && !this._view.parent)
		{
			if(this.stage)
			{
				this._view.x = (this.stage.stageWidth) / 2;
				this._view.y = (this.stage.stageHeight) / 2;
			}
			this.addChild(this._view);
		}
	}
	public hide()
	{
		if(this._view && this._view.parent)
		{
			this.removeChild(this._view);
		}
		this.clear();
		this._type = "";
	}
	public set type(t:string)
	{
		if(this._type != t)
		{
			this._type = t;
			if(!this._arrow)
				this.createArrow();
			this._view = this._arrow;
			switch(this._type)
			{
				//向上滑
				case TouchProxy.UP:
					this._arrow.rotation = -90;
					this._viewW = 100;
					this._viewH = 300;
					break;
				case TouchProxy.DOWN://向下滑
					this._arrow.rotation = 90;
					this._viewW = 100;
					this._viewH = 300;
					break;
				case TouchProxy.LEFT://向左划
					this._arrow.rotation = 180;
					this._viewW = 300;
					this._viewH = 100;
					break;
				case TouchProxy.RIGHT://向右划
					this._arrow.rotation = 0;
					this._viewW = 300;
					this._viewH = 100;
					break;
				case TouchProxy.LEFT_UP://左上
					this._arrow.rotation = -135;
					this._viewW = 240;
					this._viewH = 240;
					break;
				case TouchProxy.LEFT_DOWN://左下
					this._arrow.rotation = 135;
					this._viewW = 240;
					this._viewH = 240;
					break;
				case TouchProxy.RIGHT_UP://右上
					this._arrow.rotation = -45;
					this._viewW = 240;
					this._viewH = 240;
					break;
				case TouchProxy.RIGHT_DOWN://右下
					this._arrow.rotation = 45;
					this._viewW = 240;
					this._viewH = 240;
					break;
				case TouchProxy.POINT_THREE://三个按钮
					this._curTabIndex = 1;
					this.createPoint(3);
					this._view = this._circleContainer;
					this._viewW = this._circleContainer.width;
					this._viewH = this._circleContainer.height;
					break;
				case TouchProxy.POINT_TWO://两个按钮
					this._curTabIndex = 1;
					this.createPoint(2);
					this._view = this._circleContainer;
					this._viewW = this._circleContainer.width;
					this._viewH = this._circleContainer.height;
					break;
				case TouchProxy.POINT_FOUR://四个按钮
					this._curTabIndex = 1;
					this.createPoint(4);
					this._view = this._circleContainer;
					this._viewW = this._circleContainer.width;
					this._viewH = this._circleContainer.height;
					break;
			}
		}
			
	}
	public get type():string
	{
		return this._type;
	}

	private createArrow()
	{
		//绘制划线的提示箭头
		this._arrow = new egret.Sprite();
		this._arrow.graphics.lineStyle( 10, 0xffff99 );
		this._arrow.graphics.moveTo(-150, 0);
		this._arrow.graphics.lineTo(150, 0);
		this._arrow.graphics.moveTo(50, -50);
		this._arrow.graphics.lineTo(150, 0);
		this._arrow.graphics.moveTo(50, 50);
		this._arrow.graphics.lineTo(150, 0);
		this._arrow.alpha = 0.7;
	}
	private hitTestCircle(x:number, y:number):number
	{
		//是否按到了按钮上
		var i:number = 0;
		var len:number = this._pointCircles.length;
		var c:Circle;
		var lenX:number;
		var lenY:number;
		var l:number;
		var sizeS:number = Circle.SIZE * Circle.SIZE;
		for(i = 0; i < len; i++)
		{

			c = this._pointCircles[i];
			lenX = c.x - x;
			lenY = c.y - y;
			l = lenX * lenX + lenY * lenY;
			if( l < sizeS)
			{
				c.visible = false;
				return c.index;
				//return true;
			}
		}
		return -1;
	}

	private createPoint(num:number)
	{

		//创建按钮
		//clear();
		var tempX:number;
		var tempY:number;
		for(var i:number = 0; i < num; i++)
		{
			var c:Circle = Circle.create();//按钮创建，这里使用了对象池
			tempX = TouchProxy.POINT_CONTAINER_SIZE/2 - Math.random() * TouchProxy.POINT_CONTAINER_SIZE;
			tempY = TouchProxy.POINT_CONTAINER_SIZE/2 - Math.random() * TouchProxy.POINT_CONTAINER_SIZE;
			while(!this.checkRadio(tempX,tempY))
			{
				tempX = TouchProxy.POINT_CONTAINER_SIZE/2 - Math.random() * TouchProxy.POINT_CONTAINER_SIZE;
				tempY = TouchProxy.POINT_CONTAINER_SIZE/2 - Math.random() * TouchProxy.POINT_CONTAINER_SIZE;
			}
			c.x = tempX;
			c.y = tempY;
			
			c.init();
			c.index = i+1;
			this._pointCircles.push(c);
			this._circleContainer.addChild(c);
		}
	}
	private checkRadio(x:number,y:number)
	{
		//检查按钮是否有重叠
		var i:number = 0;
		var len:number = this._pointCircles.length;
		var c:Circle;
		var lenX:number;
		var lenY:number;
		var l:number;
		var sizeS:number = Circle.SIZE * Circle.SIZE * 4;
		for(i = 0; i < len; i++)
		{
			c = this._pointCircles[i];
			lenX = c.x - x;
			lenY = c.y - y;
			l = lenX * lenX + lenY * lenY;
			if( l < sizeS)
			{
				return false;
			}
		}
		return true;
	}
	private clear()
	{
		if(this._pointCircles.length > 0)
		{
			for(var j:number = 0, len:number = this._pointCircles.length; j < len; j++)
			{
				this._pointCircles[j].destroy();
			}
			this._circleContainer.removeChildren();
			this._pointCircles.length = 0;
		}
	}

	private onAddToStage(event:egret.Event){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
    }

    private init()
    {
    	this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler,this);
		this._pointCircles = [];
		this._circleContainer = new egret.DisplayObjectContainer();
		this._curTabIndex = 1;
    }

	private touchHandler(evt:egret.TouchEvent)
	{
		//识别玩家的手势
		switch(evt.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this._startX = evt.localX;
				this._startY = evt.localY;
				this._startStageX = evt.stageX;
				this._startStageY = evt.stageY;
				break;
			case egret.TouchEvent.TOUCH_END:
				this._endX = evt.localX;
				this._endY = evt.localY;
				this._endStageX = evt.stageX;
				this._endStageY = evt.stageY;
				if(this._endX > this._startX + 100)
				{
					if(this._endY > this._startY + 100)
					{
						//向右下划了
						//console.log("right down");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.RIGHT_DOWN));
					}
					else if(this._endY < this._startY - 100)
					{
						//向右上划了
						//console.log("right up");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.RIGHT_UP));
					}
					else
					{
						//向右划了
						//console.log("right");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.RIGHT));
					}

				}
				else if(this._endX < this._startX - 100)
				{
					if(this._endY > this._startY + 100)
					{
						//向左下划了
						//console.log("left down");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.LEFT_DOWN));
					}
					else if(this._endY < this._startY - 100)
					{
						//向左上划了
						//console.log("left up");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.LEFT_UP));
					}
					else
					{
						//向左划了
						//console.log("left");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.LEFT));
					}
				}
				else
				{
					if(this._endY > this._startY + 100)
					{
						//向下划了
						//console.log("down");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.DOWN));
					}
					else if(this._endY < this._startY - 100)
					{
						//向上滑了
						//console.log("up");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.UP));
					}
					else
					{
						//点击屏幕
						//console.log("tab");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.TAB));
					}
				}
				if(this._type == TouchProxy.POINT_THREE
					||this._type == TouchProxy.POINT_TWO
					||this._type == TouchProxy.POINT_FOUR
				  )
				{
					////多个按钮时判断是否按照顺序都点到了
					var tabIndex:number = this.hitTestCircle(this._endX - this._view.x, this._endY - this._view.y);
					if(tabIndex == this._curTabIndex)
					{
						//&& this._type == TouchProxy.POINT_TWO  && this._type == TouchProxy.POINT_THREE  && this._type == TouchProxy.POINT_FOUR
						if(tabIndex == 2 )
						{
							this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.POINT_TWO));
						}
						if(tabIndex == 3 )
						{
							this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.POINT_THREE));
						}
						if(tabIndex == 4 )
						{
							this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.POINT_FOUR));
						}
						this._curTabIndex++;
					}
				}
				break;
		}
	}

	public destroy()
	{
		if(this.stage)
		{
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler,this);
		}
		
	}
}
class Circle extends egret.Sprite
{
	public static SIZE:number = 30;
	private _radio:number;
	private _index:number;
	private _txt:egret.TextField;
	private _bmp:egret.Bitmap;

	public static allCircles:Circle[] = [];

	public static create():Circle
	{
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
	}

	public constructor()
	{
		super();
		this._radio = Circle.SIZE;
		
	}
	public set index(i:number)
	{
		this._index = i;
		this._bmp.texture = RES.getRes("number" + i);
	}
	public get index():number
	{
		return this._index;
	}
	public init()
	{

		this._bmp = new egret.Bitmap();
		this._bmp.width = Circle.SIZE * 2;
		this._bmp.height = Circle.SIZE * 2;
		this._bmp.x = -Circle.SIZE;
		this._bmp.y = -Circle.SIZE;
		this.addChild(this._bmp)
	}
	public destroy()
	{
		this.visible = true;
		Circle.allCircles.push(this);
	}
}
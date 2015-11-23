/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer{

    public static STATE_INTRO:number = 1;
    public static STATE_GAME:number = 2;
    public static STATE_OVER:number = 3;

    private loadingView:LoadingUI;

    private _state:number;
    private _curState:egret.DisplayObject;
    private _bg:egret.Bitmap;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.loadingView  = new LoadingUI();
        this.stage.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    

    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            //资源加载完毕，开始创建游戏场景
            this.createGameScene();
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    private textContainer:egret.Sprite;
    
    /**
     * 创建游戏场景
     */
    private createGameScene():void
    {
        //添加游戏背景
        this._bg = new egret.Bitmap();
        this._bg.texture = RES.getRes("bg");
        this._bg.width = this.stage.stageWidth;
        this._bg.height = this.stage.stageHeight;
        this.addChild(this._bg);
       this._state = -1;
        //游戏的各个界面通过状态机实现，首先进入的是游戏介绍界面
       this.state = Main.STATE_INTRO;
       //this.state = Main.STATE_GAME;
       //this.state = Main.STATE_OVER;
    }
    
    public set state(s:number)
    {
        if(this._state != s)
        {
            this._state = s;
            if(this._curState && this._curState.parent)
            {
                this.removeChild(this._curState);
            }
            switch(this._state)
            {
                case Main.STATE_INTRO:
                    //创建游戏介绍界面
                    this._curState = new StateIntro();
                    //当点击游戏介绍界面后，进入游戏主界面
                    this._curState.addEventListener("GameStart",this.gameStart,this);
                    this.addChild(this._curState);
                    break;
                case Main.STATE_GAME:
                    //创建游戏主界面
                    this._curState = new PhysicsTest();
                    //当游戏结束后进入游戏结束界面
                    this._curState.addEventListener("GameOver",this.gameOver,this);
                    this.addChild(this._curState);
                    break;
                case Main.STATE_OVER:
                    //创建游戏结束界面
                    this._curState = new StateOver();
                    //当点击重新开始游戏时，再次进入游戏主界面
                    this._curState.addEventListener("GameStart",this.gameStart,this);
                    this.addChild(this._curState);
                    break;
            }
        }
    }

    private gameStart(e:egret.Event)
    {
        this.state = Main.STATE_GAME;
    }
    private _container:egret.Sprite;
    private gameOver(e:egret.Event)
    {
        console.log("gameOver");



        //console.log(text_Input);

        this.state = Main.STATE_OVER;
    }

}



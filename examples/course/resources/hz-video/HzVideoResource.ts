/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {
    $,
    Resource,
    ResourceController,
    EventEmitterFactory,
    ScormService,
    NavigatorService,
    DataOptions
} from "@haztivity/core";
import * as Plyr from "plyr";
@Resource(
    {
        name: "HzVideo",
        dependencies: [
            $,
            EventEmitterFactory,
            ScormService,
            NavigatorService,
            DataOptions
        ]
    }
)
export class HzVideoResource extends ResourceController {
    public static readonly NAMESPACE = "hzVideo";
    protected static readonly PREFIX = "hz-video";
    protected static readonly CLASS_COMPONENT = HzVideoResource.PREFIX;
    protected _player;
    protected _endTime:number;
    protected static readonly DEFAULTS_PLYR = {
    };
    protected static readonly DEFAULTS = {
    };
    constructor(_$: JQueryStatic, _eventEmitterFactory,protected _scormService:ScormService,protected _navigatorService:NavigatorService, protected _dataOptions) {
        super(_$, _eventEmitterFactory);
    }

    init(options, config?) {
        this._options = this._$.extend(true,{},HzVideoResource.DEFAULTS,options);
        this._config = config;
        let plyrOptions  = this._dataOptions.getDataOptions(this._$element, "plyr");
        if(this._options.optional){
            this._markAsCompleted();
        }
        this._options.plyr = this._$.extend(true,{}, HzVideoResource.DEFAULTS_PLYR, plyrOptions);
        this._initVideo();
    }
    protected _initVideo(){
        this._player = new Plyr(this._$element,this._options.plyr);
        this._assignEvents();
    }
    protected _getEndMoment(offset){
        let result:number;
        const time = parseFloat(offset);
        if(!isNaN(time)){
            result = offset < 0 ? this._player.duration + offset : offset ;
        }
        return result;
    }
    protected _resolveEndOffset(offset){
        let result = false,
            time = this._getEndMoment(offset);
        if((typeof time).toLowerCase() == "number" && time > 0 && time < this._player.duration){
            result = true;
            this._endTime = time;
        }
        return result;
    }
    protected _assignEndEvent(){
        if(this._options.endOffset && this._resolveEndOffset(this._options.endOffset)) {
            this._player.off("timeupdate");
            this._player.on("timeupdate", this._onTimeUpdate.bind(this));
        }else {
            this._player.off("ended");
            this._player.on("ended", this._onVideoEnd.bind(this));
        }
    }
    protected _onRateChange(){
        this._assignEndEvent();
    }
    protected _assignEvents(){
        this._player.on("playing",this._onVideoPlay.bind(this));
        this._player.on("ratechange",this._onRateChange.bind(this));
    }
    protected _onVideoPlay(){
        if(this.isDisabled()){
            this._player.stop();
            this._player.restart();
        }else{
            this._assignEndEvent();
        }
    }
    protected _onTimeUpdate(){
        if(this._player.currentTime >= this._endTime){
            this._markAsCompleted();
        }
    }
    protected _onVideoEnd(){
        this._markAsCompleted();
    }
    public disable(){
        if(this._options.forceEnable != true){
            return super.disable();
        }else{
            return false;
        }
    }
}

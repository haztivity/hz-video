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
import * as plyr from "plyr";
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
        this._options.plyr = this._$.extend(true,{}, HzVideoResource.DEFAULTS_PLYR, plyrOptions);
        this._initVideo();
    }
    protected _initVideo(){
        this._player = plyr.setup(this._$element.get(0),this._options.plyr)[0];
        this._assignEvents();
    }
    protected _assignEvents(){
        this._player.on("playing",this._onVideoPlay.bind(this));
        this._player.on("ended",this._onVideoEnd.bind(this));
    }
    protected _onVideoPlay(){
        if(this.isDisabled()){
            this._player.stop();
            this._player.restart();
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

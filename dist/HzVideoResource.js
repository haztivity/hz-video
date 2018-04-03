var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@haztivity/core", "plyr"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var core_1 = require("@haztivity/core");
    var Plyr = require("plyr");
    var HzVideoResource = /** @class */ (function (_super) {
        __extends(HzVideoResource, _super);
        function HzVideoResource(_$, _eventEmitterFactory, _scormService, _navigatorService, _dataOptions) {
            var _this = _super.call(this, _$, _eventEmitterFactory) || this;
            _this._scormService = _scormService;
            _this._navigatorService = _navigatorService;
            _this._dataOptions = _dataOptions;
            return _this;
        }
        HzVideoResource_1 = HzVideoResource;
        HzVideoResource.prototype.init = function (options, config) {
            this._options = this._$.extend(true, {}, HzVideoResource_1.DEFAULTS, options);
            this._config = config;
            var plyrOptions = this._dataOptions.getDataOptions(this._$element, "plyr");
            if (this._options.optional) {
                this._markAsCompleted();
            }
            this._options.plyr = this._$.extend(true, {}, HzVideoResource_1.DEFAULTS_PLYR, plyrOptions);
            this._initVideo();
        };
        HzVideoResource.prototype._initVideo = function () {
            this._player = new Plyr(this._$element, this._options.plyr);
            this._assignEvents();
        };
        HzVideoResource.prototype._getEndMoment = function (offset) {
            var result;
            var time = parseFloat(offset);
            if (!isNaN(time)) {
                result = offset < 0 ? this._player.duration + offset : offset;
            }
            return result;
        };
        HzVideoResource.prototype._resolveEndOffset = function (offset) {
            var result = false, time = this._getEndMoment(offset);
            if ((typeof time).toLowerCase() == "number" && time > 0 && time < this._player.duration) {
                result = true;
                this._endTime = time;
            }
            return result;
        };
        HzVideoResource.prototype._assignEndEvent = function () {
            if (this._options.endOffset && this._resolveEndOffset(this._options.endOffset)) {
                this._player.off("timeupdate");
                this._player.on("timeupdate", this._onTimeUpdate.bind(this));
            }
            else {
                this._player.off("ended");
                this._player.on("ended", this._onVideoEnd.bind(this));
            }
        };
        HzVideoResource.prototype._onRateChange = function () {
            this._assignEndEvent();
        };
        HzVideoResource.prototype._assignEvents = function () {
            this._player.on("playing", this._onVideoPlay.bind(this));
            this._player.on("ratechange", this._onRateChange.bind(this));
        };
        HzVideoResource.prototype._onVideoPlay = function () {
            if (this.isDisabled()) {
                this._player.stop();
                this._player.restart();
            }
            else {
                this._assignEndEvent();
            }
        };
        HzVideoResource.prototype._onTimeUpdate = function () {
            if (this._player.currentTime >= this._endTime) {
                this._markAsCompleted();
            }
        };
        HzVideoResource.prototype._onVideoEnd = function () {
            this._markAsCompleted();
        };
        HzVideoResource.prototype.disable = function () {
            if (this._options.forceEnable != true) {
                return _super.prototype.disable.call(this);
            }
            else {
                return false;
            }
        };
        HzVideoResource.NAMESPACE = "hzVideo";
        HzVideoResource.PREFIX = "hz-video";
        HzVideoResource.CLASS_COMPONENT = HzVideoResource_1.PREFIX;
        HzVideoResource.DEFAULTS_PLYR = {};
        HzVideoResource.DEFAULTS = {};
        HzVideoResource = HzVideoResource_1 = __decorate([
            core_1.Resource({
                name: "HzVideo",
                dependencies: [
                    core_1.$,
                    core_1.EventEmitterFactory,
                    core_1.ScormService,
                    core_1.NavigatorService,
                    core_1.DataOptions
                ]
            })
        ], HzVideoResource);
        return HzVideoResource;
        var HzVideoResource_1;
    }(core_1.ResourceController));
    exports.HzVideoResource = HzVideoResource;
});
//# sourceMappingURL=HzVideoResource.js.map
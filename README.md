# hz-video
hz-video is an haztivity resource to manage videos from different sources.\
hz-video uses [plyr](https://github.com/sampotts/plyr) under the hood.
## Install
### NPM
```npm i --save @haztivity/hz-video```
## Dependencies
- plyr
- @haztivity/core
## Usage
1. Import @haztivity/hz-video
2. [Optional] You could import the default theme for plyr `import "plyr/dist/plyr.css";`
3. Add HzVideoResource to the page
4. [Config plyr](https://github.com/sampotts/plyr#quick-setup)
5. Set ```data-hz-resource="HzVideo"```
### Ts
```typescript
import {PageFactory, Page, PageController, PageRegister} from "@haztivity/core";
import template from "./page.pug";
//Import the default theme of plyr
import "plyr/dist/plyr.css";
import {HzVideoResource} from "@haztivity/hz-video";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "myPage",
        resources: [
            HzVideoResource
        ],
        template: template
    }
);
```
### Pug
```pug
// Youtube
// Video id is the id of the youtube video
div(data-hz-resource="HzVideo", data-type="youtube" data-video-id="C0DPdy98e4c")
```
or
### HTML
```html
<!-- Youtube -->
<!-- Video id is the id of the youtube video -->
<div data-hz-resource="HzVideo", data-type="youtube", data-video-id="C0DPdy98e4c"></div>
```
## Options
### plyr options
All the options of jqQuiz quiz **except** functions could be specified by attributes using:
```pug
    data-opt-plyr-[option]=[value]
```
If the option have multiple words, use dashes, for example ```loadSprite``` have to be provided as ```load-sprite```\
For more info please visit [plyr](https://github.com/sampotts/plyr#options)
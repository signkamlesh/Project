import { LightningElement,api ,track} from 'lwc';

export default class RootParent extends LightningElement {

@track searchTermFromEvent;

handlesearchSelectedEvent(event)
{
    //catching the component event and assigning value of type in searchTermEvent
this.searchTermFromEvent=event.detail;

}

}
import { LightningElement ,api,wire } from 'lwc';

import { fireEvent } from 'c/pubsub';

import {CurrentPageReference} from 'lightning/navigation';



export default class CardComponent extends LightningElement {
    @api account;
    pageRef;
    @wire (CurrentPageReference)
    wirePageRef(data){
        if(data){
            this.pageRef = data;
            //this.dispatchEvent(new CustomEvent('ready'));
        }
    }

    handleClick()
    {
        //fire the event which is handled by LdsDetailComponent 
        console.log('pubsub event occured');
        fireEvent(this.pageRef,'pubsubevent',this.account);
    }
}
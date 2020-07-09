import { LightningElement,api,wire } from 'lwc';
import getAllAccountsByType from '@salesforce/apex/DemoApex.getAllAccountsByType';

import { registerListener, unregisterAllListeners } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

import {refreshApex} from '@salesforce/apex';
export default class SearchResult extends LightningElement {
    
    @api selectedItem;
    @wire(getAllAccountsByType,{search:'$selectedItem',records:50}) myAccounts;
    pageRef;
    @wire(CurrentPageReference)     
    wirePageRef(data){
        if(data){
            this.pageRef = data;
            //this.dispatchEvent(new CustomEvent('ready'));
        }
    }

    refreshData(data)
    {
        console.log('i reached in refresh');
        return refreshApex(this.myAccounts);
    }
    connectedCallback()
    {
        registerListener("pubsubevent1",this.refreshData,this);
    }

    disconnectedCallback()
    {
    unregisterAllListeners(this);
    }

}
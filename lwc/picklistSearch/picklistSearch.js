import { LightningElement,track ,wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE from '@salesforce/schema/Account.Type';


export default class PicklistSearch extends LightningElement {
    @wire(getPicklistValues, { recordTypeId: '0120I000001M1KLQA0', fieldApiName: TYPE }) typeArray;
    @track selectedvalue;
    @track firstload=true;
    @track searchEnabled = true;

    renderedCallback()
    {
    if (this.typeArray.data && this.firstload)

    {
        this.searchEnabled=false;
        this.firstload=false;
        this.selectedvalue=this.typeArray.data.values[0].value;
    }
    console.log('value is '+this.typeArray);
}

get options() {
    return this.typeArray.data ? this.typeArray.data.values:{};
    
}

handleChange(event)
{ 
    console.log('reached here');
    return this.selectedvalue=event.detail.value;
    //console.log('reached here');
}

handleTypeSearch(event)
{
    console.log('empty ');
    this.dispatchEvent(new CustomEvent('searchtermselected',{detail:this.selectedvalue}));
}
}
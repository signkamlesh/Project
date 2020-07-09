import { LightningElement, wire, track } from "lwc";

import { registerListener, unregisterAllListeners, fireEvent } from "c/pubsub";

import { CurrentPageReference } from "lightning/navigation";

import saveImperativeAccount from "@salesforce/apex/DemoApex.saveImperativeAccount";

import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LdsDetailComponent extends LightningElement {
  pageRef;
  @track accountId;
  @track Phone;
  @track Industry;
  @track Type;
  @track accountName;
  @track returnValue;
  @track error;
  @track showData = false;
  @track account;
  @track editRecord = false;
  @track noRecordLabel = false;
  @wire(CurrentPageReference)
  wirePageRef(data) {
    if (data) {
      this.pageRef = data;
    }
  }

  constructor() {
    super();
  }
  getId(event) {
    //assigning values to the parameter from lightening input field
    this.accountId = event.target.value;
  }
  getPhone(event) {
    //assigning values to the parameter from lightening input field
    this.Phone = event.target.value;
  }

  getIndustry(event) {
    //assigning values to the parameter from lightening input field
    this.Industry = event.target.value;
  }

  getName(event) {
    //assigning values to the parameter from lightening input field
    this.accountName = event.target.value;
  }

  handleSubmit(event) {
    // this method is used to send data for update to the server, triggered while submitting the record
    saveImperativeAccount({
      accountName: this.accountName,
      Phone: this.Phone,
      Type: this.Type,
      Industry: this.Industry,
      accountId: this.accountId
    })
      .then((result) => {
        this.returnValue = result;
        this.error = undefined;
        console.log("return value is " + this.returnValue);
        if (this.returnValue) {
          console.log("toast");
          //toast
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Record Updated",
              message: "Record Updated",
              variant: "success",
              mode: "pester"
            })
          );

          this.editRecord = false;
          this.showData = true;
          
          console.log("event fired to search");
          fireEvent(this.pageRef, "pubsubevent1", this.account);
          
        }
      })
      .catch((error) => {
        this.error = error;
        this.returnValue = undefined;
      });
  }

  handleCancel() {
    // trigger on cancel button
    this.editRecord = false;
    this.showData = true;
  }

  handleEdit() {
    //it will trigger on edit button, changed
    this.editRecord = true;
    this.showData = false;
    this.noRecordLabel = true;
    console.log("reached here");
  }
  isDisabled()
  {
    return true;
  }

  connectedCallback() {
    //registering the event which will be coming from cardComponent Event
    registerListener("pubsubevent", this.handlePubSubEvent, this);
  }

  handlePubSubEvent(data) {
    //this is the event handler
    console.log("data is " + data);
    console.log("data is is " + JSON.stringify(data));
    // initializing the variable
    this.account = data;
    this.showData = true;
    this.editRecord = false;
    this.accountName = this.account.Name;
    this.Phone = this.account.Phone;
    this.Type = this.account.Type;
    this.Industry = this.account.Industry;
    this.accountId = this.account.Id;
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }
}
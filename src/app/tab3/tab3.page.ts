import { Component } from '@angular/core';
import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'

const client = makeClient({
  // host: 'http://172.16.11.79'
  host: 'http://localhost:5003'
  // host: 'http://172.20.10.3:5003'
})
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  order_list: any;
  order_details: any;
  constructor(){
  }

  ionViewDidEnter() {
    this.getorder();
  }

  getorder(){
    client.account.completedOrdersList({'bearerToken': localStorage.bearerToken}, {'include': 'line_items'}).then(
      (data) => {
        if(data.isSuccess()){
          this.order_list = data.success().data
        }
      }
    )
  }

}

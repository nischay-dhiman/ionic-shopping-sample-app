import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { makeClient } from '@spree/storefront-api-v2-sdk'

// When using the SDK in a <script> tag or as part of a Webpack bundle
// targeted for the browser, instead use:
import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'

const client = makeClient({
  // host: 'http://localhost:5003'
  // host: 'http://172.16.11.79:5003'
  host: 'http://localhost:5003'
  // host: 'http://172.20.10.3:5003'
})

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  access_token: string;
  home_data: any;
  products_list = [];
  response_listing = [];
  order_token: any;
  constructor( public httpClient: HttpClient)
  {
    this.getAuthFromClient();
    this.getProductsFromClient();
  }

  getProductsList(){
    let headers = new HttpHeaders({'X-Spree-Token': '5c69479af92663a025e5178d96dfe0494aedd955e6647f18'});
    this.home_data = this.httpClient.get('http://localhost:5003/api/v2/storefront/products?include=images', {headers: headers});
    this.home_data.subscribe(data => {
      this.home_data = data;
      this.response_listing = this.home_data.data;

      if(this.response_listing.length > 0){
        for (var i = 0; i < this.response_listing.length; i++) {
            this.response_listing[i]['image'] = this.home_data.included.filter(a => a.id === this.response_listing[i].relationships.images.data[0].id)[0].attributes.styles[3].url
          this.products_list.push(this.response_listing[i]);
        }
      }
    });
  }

  getAuthFromClient(){
    client.authentication.getToken({
      username: 'spree@example.com',
      password: 'test1234',
    }).then(
      (data) =>{
        this.access_token = data.success().access_token
        localStorage.setItem('bearerToken', this.access_token)
      }
    )
  }

  getProductsFromClient(){
    client.products.list({'include': 'images'}).then(
      (data) =>{
        this.home_data = data.success();
        this.response_listing = this.home_data.data;
  
        if(this.response_listing.length > 0){
          for (var i = 0; i < this.response_listing.length; i++) {
              this.response_listing[i]['image'] = this.home_data.included.filter(a => a.id === this.response_listing[i].relationships.images.data[0].id)[0].attributes.styles[3].url
            this.products_list.push(this.response_listing[i]);
          }
        }
      } 
    )
  }

  addToCart(product_id){
    client.cart.create({ 'bearerToken': localStorage.bearerToken }).then(
      () => {
        client.cart.addItem({ 'bearerToken': localStorage.bearerToken }, {
          'variant_id': product_id,
          'quantity': 1
        }).then(
          (data) => {
            console.log(data.success());
          }
        )
      }
    )
  }

}

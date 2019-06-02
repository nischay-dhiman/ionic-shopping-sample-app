import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'

const client = makeClient({
  host: 'http://localhost:5003'
})


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  id: string;
  product_response: any;
  product_detail: any;
  constructor(private route: ActivatedRoute, public httpClient: HttpClient) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // this.getProductData(this.id);
    this.getProductDetailFromClient(this.id);
  }

  getProductData(id){
    let headers = new HttpHeaders({'X-Spree-Token': '5c69479af92663a025e5178d96dfe0494aedd955e6647f18'});
    this.product_response = this.httpClient.get(`http://localhost:5003/api/v2/storefront/products/${id}?include=images`, {headers: headers});
    this.product_response.subscribe(data => {
      this.product_response = data;
      this.product_detail = this.product_response.data;
      this.product_detail['image'] = this.product_response.included.filter(a => a.id === this.product_detail.relationships.images.data[0].id)[0].attributes.styles[3].url
    });
  }

  getProductDetailFromClient(id){
    client.products.show( id, {'include': 'images'}).then(
      (data) =>{
        this.product_response = data.success();
        this.product_detail = this.product_response.data;
        this.product_detail['image'] = this.product_response.included.filter(a => a.id === this.product_detail.relationships.images.data[0].id)[0].attributes.styles[3].url
      } 
    )
  }

}

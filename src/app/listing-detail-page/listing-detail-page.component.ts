import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-detail-page',
  templateUrl: './listing-detail-page.component.html',
  styleUrls: ['./listing-detail-page.component.css']
})
export class ListingDetailPageComponent implements OnInit{
  isloading: boolean = true;
  listings: Listing[] = [];

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
  ) {}
 ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(<string>id)
      .subscribe(listing => {
        this.listings = [listing];
        this.isloading = false;
      });
    this.listingsService.addViewToListing(<string>id)
      .subscribe(() => console.log('Views updated!'));
  }

}

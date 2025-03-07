import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
   email: string = '';
   message: string = '';
   listings: Listing[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(<string>id)
      .subscribe(listing => {
        this.listings = [listing];
        this.message = `Hi, I'm interested in your ${this.listings[0].name.toLowerCase()}!`;
      });
  }
  sendMessage() {
    alert('Your message has been sent!');
    this.router.navigateByUrl('/listings');
  }

}

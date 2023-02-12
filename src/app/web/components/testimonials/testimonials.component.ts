import { Component } from '@angular/core';
import { TeamSlider, TestimonialSlider } from '../../elements/slider';
import { WebService } from '../../services/web/web.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {

  public TeamSliderConfig: any = TeamSlider;
  public TestimonialSliderConfig: any = TestimonialSlider;
  public testimonials: any = [];

  constructor(
    public webService: WebService,
  ) { }

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials = async() => {
    let resp = await this.webService.getData('getTestimonials');
    if(resp && resp.list){
      this.testimonials = resp.list;
    }
  }
 
}

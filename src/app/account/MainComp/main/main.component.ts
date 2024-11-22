import { Component } from '@angular/core';
import { ScrollcardComponent } from '../../Comp/scrollcard/scrollcard.component';
import { AstrologercardsComponent } from '../../Comp/astrologercards/astrologercards.component';
import { FaqComponent } from '../../Comp/faq/faq.component';
import { HerosectionComponent } from '../../Comp/herosection/herosection.component';
import { SignupComponent } from '../../AuthComp/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
// import { HeroComponent } from '../../hero/hero.component';
import { AstroCarousalComponent } from '../../Comp/astro-carousal/astro-carousal.component';
import { DailyHoroscopeComponent } from '../../Comp/daily-horoscope/daily-horoscope.component';
import { HeroComponent } from '../../Comp/hero/hero.component';
import { OtherServicesComponent } from '../../Comp/other-services/other-services.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ScrollcardComponent,HeroComponent,OtherServicesComponent,DailyHoroscopeComponent,AstrologercardsComponent,FaqComponent,HerosectionComponent,HttpClientModule,AstroCarousalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}

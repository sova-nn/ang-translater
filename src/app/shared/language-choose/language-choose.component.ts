import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  OnInit, Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { gsap } from 'gsap';
const LANG = ['ru', 'en', 'sp', 'it', 'ge', 'sr'];

@Component({
  selector: 'app-language-choose',
  templateUrl: 'language-choose.component.html',
  styleUrls: ['language-choose.component.scss']
})
export class LanguageChooseComponent implements OnInit, AfterViewInit {
  languages: string[];
  toggle = false;
  selectedLanguage = 'ru';
  tl = gsap.timeline({defaults: {ease: 'power2.inOut'}});

  @ViewChild("activator", {static: true})
  activator: ElementRef<HTMLDivElement>;
  @ViewChild("nav", {static: true})
  nav: ElementRef<HTMLDivElement>;
  @ViewChild("ul", {static: true})
  ul: ElementRef<HTMLDivElement>;
  @ViewChildren("imgs") imgs: QueryList<any>

  @Output() languageSelected = new EventEmitter<string>();

  ngOnInit(): void {
    this.languages = this.getFilteredLanguage(this.selectedLanguage);
  }

  ngAfterViewInit(): void {
    this.createAnimate();
  }

  onCardClick(): void {
    this.toggle = !this.toggle;
    this.toggle ? this.tl.play() : this.tl.reverse();
  }

  createAnimate(): void {
    const imageContainers = this.ul.nativeElement.childNodes;
    this.tl.to(this.activator.nativeElement, {
      'borderRadius': '5em 0 0 5em'
    });
    this.tl.to(this.nav.nativeElement, {
      'clipPath': 'ellipse(100% 100% at 50% 50%)'
    }, "-=.5");

    imageContainers.forEach((node) => {
      //TODO: переписать в нормальный вид
      return this.tl.to(node.firstChild && node.firstChild.firstChild, {
        opacity: 1,
        transform: 'translateX(0)',
        stagger: .05
      }, "-=.5")
    });

    this.tl.pause();
  }

  selectLanguage(event: string): void {
    this.selectedLanguage = event;
    this.onCardClick();
    this.languages = this.getFilteredLanguage(event);

    this.languageSelected.emit(event);
  }

  getFilteredLanguage(language: string): string[] {
    const allLang = [...LANG];
    return allLang.filter((lang) => lang !== language);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from "../../services/translate.service";
import { GetTranslationInterface, TranslationItem } from "../../interfaces/getTranslation.interface";
import { catchError, Subject, switchMap, throwError } from "rxjs";
import {TranslateData, TranslateDataRequest} from "../../interfaces/translateData.interface";
import { NotificationComponent } from "../notification/notification.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit, OnDestroy {
  translateData: GetTranslationInterface;
  interpretation: string;

  textToTranslate$ = new Subject<TranslateDataRequest>();

  private translationRequest: TranslateDataRequest = {
    text: '',
    sourceLanguageCode: 'ru',
    targetLanguageCode: 'ru',
  };

  constructor(private translateService: TranslateService, public dialog: MatDialog) {}

  ngOnInit(): void {

    this.textToTranslate$.asObservable()
      .pipe(
        switchMap((data) => {
          let dataArray = data.text.split(' ');
          return this.translateService.getTranslationWithTimer(dataArray, data.sourceLanguageCode, data.targetLanguageCode)
        }),
        catchError((err) => {
          this.openDialog();
          return throwError(err);
        })
      )
      .subscribe((data) => {
          this.translateData = data;
          this.interpretation = this.mapToString(data.translations);
      });
  }

  ngOnDestroy(): void {
    this.textToTranslate$.unsubscribe();
  }

  mapToString(translationArray: TranslationItem[]): string {
    if (translationArray.length === 1) {
      return translationArray[0].text;
    }
    return translationArray.reduce((previousValue, currentValue) => previousValue + ' ' + currentValue.text, '');
  }

  onTranslate(): void {
    if (this.translationRequest) {
      this.textToTranslate$.next(this.translationRequest);
    }
  }

  changeRequestTranslateData(data: TranslateData): void {
    this.translationRequest = {
      ...this.translationRequest,
      text: data.text,
      sourceLanguageCode: data.lang,
    }
  }

  changeResponseTranslateLang(lang: string): void {
    this.translationRequest = {
      ...this.translationRequest,
      targetLanguageCode: lang,
    }
  }

  openDialog(): void {
    this.dialog.open(NotificationComponent, {
      width: '250px',
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { API_FOLDER_ID, API_TOKEN } from '../../environments/keys';
import { interval, Observable, race, retry, tap } from "rxjs";
import { GetTranslationInterface } from "../interfaces/getTranslation.interface";

const YA_TRANSLATE_URL = 'https://translate.api.cloud.yandex.net/translate/v2/translate';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor(private http: HttpClient) {}

  withCors(url: string) {
    return `https://cors-anywhere.herokuapp.com/${url}`;
  }

  headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', 'POST')
    .append('Access-Control-Allow-Methods', 'GET')
    .append('AllowedHeader', 'true')
    .append('Access-Control-Allow-Origin', '*')
    .append('Authorization', `Bearer ${API_TOKEN}`);


  getTranslation(
    text: string[] = ['Hello', 'World'],
    sourceLanguageCode = 'fr',
    targetLanguageCode = 'ru'
  ): Observable<GetTranslationInterface> {
    return this.http.post<GetTranslationInterface>(this.withCors(YA_TRANSLATE_URL), {
      folderId: API_FOLDER_ID,
      texts: text,
      sourceLanguageCode: sourceLanguageCode,
      targetLanguageCode: targetLanguageCode,
    }, {headers: this.headers})
  }

  getConnectionTimer(): Observable<any> {
    return interval( 10000).pipe(
      tap(() => {
        throw new Error;
      })
    )
  }

  getTranslationWithTimer(
    text: string[] = ['Hello', 'World'],
    sourceLanguageCode = 'fr',
    targetLanguageCode = 'ru'
  ): Observable<any> {
    // добавлен таймаут, который выдает ошибку через 10 сек
    // если сервер ответит раньше, то сработает обработка запроса,
    // в противном таймаут выкинет ошибку
    // в случае ошибки любого потока сработает retry и поток запустится еще 2 раза
    return race(
      this.getTranslation(text, sourceLanguageCode, targetLanguageCode),
      this.getConnectionTimer()
    )
      .pipe(retry({count: 2}));
  }
}

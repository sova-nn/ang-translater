import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clipboard } from "@angular/cdk/clipboard";
import { TranslateData } from "../../interfaces/translateData.interface";

@Component({
  selector: 'app-translator-window',
  templateUrl: './translator-window.component.html',
  styleUrls: ['./translator-window.component.scss']
})
export class TranslatorWindowComponent implements OnInit {
  lang = 'ru';
  translateData: TranslateData;

  @Input() text = '';
  @Input() isTranslateTextInput = false;

  @Output() translateDataChanged = new EventEmitter<TranslateData>();

  constructor(
    private clipboard: Clipboard
  ) {}

  ngOnInit() {
    this.translateData = {
      text: '',
      lang: this.lang,
      isTranslateTextInput: this.isTranslateTextInput
    }
  }

  onTextPaste() {
    navigator.clipboard.readText().then(
      text => {
        this.text = text;
        this.translateData = {
          ...this.translateData,
          text: text,
        }
        this.translateDataChanged.emit(this.translateData);
      }
    )
      .catch(error => {
          console.error('Cannot read clipboard text: ', error);
        }
      );
  }

  onTextCopy() {
    this.clipboard.copy(this.text);
  }

  onChangeTranslateLang(lang: string) {
    this.translateData = {
      ...this.translateData,
      lang: lang,
    }
    this.translateDataChanged.emit(this.translateData);
  }

  onChangeTranslateText(event: any) {
    this.translateData = {
      ...this.translateData,
      text: event.target.value,
    }
    this.translateDataChanged.emit(this.translateData);
  }
}

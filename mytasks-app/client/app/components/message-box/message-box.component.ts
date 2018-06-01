import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  message: string;
  title: string;
  onClose: Subject<boolean>;

  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  ok() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  cancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}

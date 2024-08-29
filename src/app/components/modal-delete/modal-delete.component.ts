import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent implements OnInit {
  @Input() modalRef: any;
  @Input() data: any;
  isDeleted: boolean = false;
  @Output() eventEmitter = new EventEmitter<boolean>();

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  comfirmDelete() {
    this.modalRef.close();
    this.isDeleted = true;
    this.eventEmitter.emit(this.isDeleted);
  }
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css'],
  standalone: true,
  imports: [ProductFormComponent]
})
export class ModalProductComponent implements OnInit {
  @Input() modalRef: any;
  @Input() data: any;
  @Input() productsRows: any;
  @Output() getProductsEmitter = new EventEmitter();
  

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

}
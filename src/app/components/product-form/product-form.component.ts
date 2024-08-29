import { ModalProductComponent } from './../modal-product/modal-product.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../services/products/products.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from '../../services/communication/communication.service';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})

export class ProductFormComponent implements OnInit {
  @Output() getProductsEmitter = new EventEmitter();
  @Input() product: any;
  @Input() modalProduct: any;
  @Input() productsRows: any;
  form: FormGroup = new FormGroup({});
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private _product: ProductsService,
    private _snackbar: SnackbarService,
    private communicationService: CommunicationService 
  ) {
    this.form = this.fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      fecha: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.form.setValue({
      id: this.product?.id || -1,
      name: this.product?.name || '',
      price: this.product?.price || '',
      fecha: this.product?.fecha || '',
    });
  }
  
  onFormSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.communicationService.notify(this.form.value);
    }
  }

}
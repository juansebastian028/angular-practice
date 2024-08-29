import { CommunicationService } from './../../services/communication/communication.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from '../../components/table/table.component';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products/products.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { ModalProductComponent } from '../../components/modal-product/modal-product.component';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterOutlet, TableComponent, NavbarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productsRows: Product[] = [];
  productsColumns = [
    { key: 'id', display: 'Producto Id' },
    { key: 'name', display: 'Nombre' },
    { key: 'price', display: 'Precio' },
    { key: 'fecha', display: 'Fecha' },
    { key: 'antiquity', display: 'Antiguedad' },
    {
      key: 'actions',
      display: 'Acciones',
      config: {
        isAction: true,
        actions: [
          { class: ['btn', 'btn-danger'], icon: 'delete', name: 'delete' },
          { class: ['btn', 'btn-warning'], icon: 'edit', name: 'edit' },
        ],
      },
    },
  ];

  constructor(private _product: ProductsService, private modalService: NgbModal, private _snackbar: SnackbarService, private CommunicationService: CommunicationService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.CommunicationService.notify$.subscribe(data => {
        if (data.id > 0) {
          this.putProduct(data);
        } else {
          const { id, ...restData } = data;
          this.postProduct(restData);
        }
    });
  }

  getProducts() {
    this._product.getProducts().subscribe(
      {
        next: response => {
          this.productsRows = response;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  putProduct(product: Product) {
    this._product.putProduct(product).subscribe(
      {
        next: (data) => {
          this._snackbar.openSnackBar(
            'Producto actualizado exitosamente',
            'bg-success',
            'text-white'
          );
          this.getProducts();
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  postProduct(product: Product) {
    this._product.postProduct(product).subscribe(
      {
        next: (data) => {
          this._snackbar.openSnackBar(
            'Producto registrado exitosamente',
            'bg-success',
            'text-white'
          );
          this.getProducts();
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  onAddProduct() {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.componentInstance.modalRef = modalRef;
    modalRef.componentInstance.productsRows = this.productsRows;
  }

  executeAction(obj: any) {
    const product: Product = obj.element;
    if (obj.action === 'edit') {
      const modalRef = this.modalService.open(ModalProductComponent);
      modalRef.componentInstance.data = product;
      modalRef.componentInstance.modalRef = modalRef;
      modalRef.componentInstance.productsRows = this.productsRows;

    } else {
      const modalRef = this.modalService.open(ModalDeleteComponent);
      modalRef.componentInstance.data = product;
      modalRef.componentInstance.modalRef = modalRef;

      modalRef.componentInstance.eventEmitter.subscribe(
        (isDeleted: boolean) => {
          if (isDeleted) {
            this._product.deleteProduct(product.id).subscribe(
              {
                next: (data) => {
                  this.getProducts();
                  this._snackbar.openSnackBar(
                    'Producto eliminado exitosamente',
                    'bg-success',
                    'text-white'
                  );
                },
                error: (error) => {
                  console.log(error);
                }
              }
            );
          }
        }
      );
    }
  }
}


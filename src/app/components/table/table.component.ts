import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginator],
})
export class TableComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<Product>();
  isLoading: boolean = false;
  @Input() dataColumns:any[] = [];
  @Input() dataRows: Product[] = [];
  @Input() isBtnAddRequired: boolean = true;
  @Output('onAction') emitter = new EventEmitter();
  @Output() add = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor() {}

  public doFilter = (event: KeyboardEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataRows);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataRows'] && !changes['dataRows'].isFirstChange()) {
      this.dataSource = new MatTableDataSource(this.dataRows);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    } else {
      this.isLoading = true;
    }
  }

  get keys() {
    let displayedColumns = this.dataColumns
      .map(({ key }) => key);
    return displayedColumns;
  }

  handleEmitter(action: string, element: any): void {
    this.emitter.emit({ action, element });
  }
}
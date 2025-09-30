import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomDropdownComponent, DropdownOption } from '../custom-dropdown/custom-dropdown';

export interface PaginationEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-custom-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDropdownComponent],
  templateUrl: './custom-pagination.html',
  styleUrls: ['./custom-pagination.css']
})
export class CustomPaginationComponent {
  @Input() totalRecords: number = 0;
  @Input() rows: number = 10;
  @Input() first: number = 0;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20, 50];
  @Input() showCurrentPageReport: boolean = true;
  @Input() currentPageReportTemplate: string = 'Mostrando {first} a {last} de {totalRecords} registros';
  @Input() showRowsPerPageDropdown: boolean = true;
  @Input() showPageLinks: boolean = true;
  @Input() maxPageLinks: number = 5;

  @Output() onPageChange = new EventEmitter<PaginationEvent>();

  get currentPage(): number {
    return Math.floor(this.first / this.rows);
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }

  get lastRecord(): number {
    return Math.min(this.first + this.rows, this.totalRecords);
  }

  get firstRecord(): number {
    return this.totalRecords === 0 ? 0 : this.first + 1;
  }

  get pageLinks(): number[] {
    const links: number[] = [];
    const start = Math.max(0, this.currentPage - Math.floor(this.maxPageLinks / 2));
    const end = Math.min(this.totalPages - 1, start + this.maxPageLinks - 1);

    for (let i = start; i <= end; i++) {
      links.push(i);
    }

    return links;
  }

  get rowsPerPageOptionsDropdown(): DropdownOption[] {
    return this.rowsPerPageOptions.map(option => ({
      label: option.toString(),
      value: option
    }));
  }

  get currentPageReport(): string {
    return this.currentPageReportTemplate
      .replace('{first}', this.firstRecord.toString())
      .replace('{last}', this.lastRecord.toString())
      .replace('{totalRecords}', this.totalRecords.toString());
  }

  isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages - 1;
  }

  goToFirstPage(): void {
    if (!this.isFirstPage()) {
      this.changePage(0);
    }
  }

  goToPreviousPage(): void {
    if (!this.isFirstPage()) {
      this.changePage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (!this.isLastPage()) {
      this.changePage(this.currentPage + 1);
    }
  }

  goToLastPage(): void {
    if (!this.isLastPage()) {
      this.changePage(this.totalPages - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
      this.changePage(page);
    }
  }

  onRowsPerPageChange(newRows: number): void {
    this.rows = newRows;
    this.changePage(0);
  }

  private changePage(page: number): void {
    const newFirst = page * this.rows;
    const event: PaginationEvent = {
      first: newFirst,
      rows: this.rows,
      page: page,
      pageCount: this.totalPages
    };

    this.onPageChange.emit(event);
  }

  trackByPage(index: number, page: number): number {
    return page;
  }
}

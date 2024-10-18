import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Disponible à l'échelle de l'application
})
export class PaginationService {

  constructor() {}

  // Méthode pour paginer les données
  paginate(data: any[], pageSize: number, currentPage: number): any[] {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }

  // Calcul du nombre total de pages
  getTotalPages(data: any[], pageSize: number): number {
    return Math.ceil(data.length / pageSize);
  }
}

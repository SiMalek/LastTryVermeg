import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addQuestion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateQuestion(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  exportToExcel(): void {
    window.location.href = `${this.apiUrl}/export/excel`;
  }

  importFromExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/import/excel`, formData);
  }

  getDuplicates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/duplicates`);
  }
}
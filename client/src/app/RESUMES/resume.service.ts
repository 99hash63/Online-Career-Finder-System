import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get('http://localhost:5000/api/resumes');
  }

  insertData(data) {
    return this.httpClient.post('http://localhost:5000/api/resume/add', data);
  }

  getDataById(id) {
    return this.httpClient.get('http://localhost:5000/api/resume/' + id);
  }

  updateData(id, data) {
    return this.httpClient.put(
      'http://localhost:5000/api/resume/edit/' + id,
      data
    );
  }

  deleteData(id) {
    return this.httpClient.delete('http://localhost:5000/api/resume/' + id);
  }
}

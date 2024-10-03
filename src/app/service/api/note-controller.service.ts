import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NoteControllerService {
    constructor(private http: HttpClient) {}

    private baseURL: string = environment.baseURL;

    getNoteList(searchText: string) {
        const httpOptions = {
            params: new HttpParams().set('search', searchText),
        };

        return this.http.get(`${this.baseURL}/hpe/notes`, httpOptions);
    }

    createNote(data: any) {
        return this.http.post(`${this.baseURL}/hpe/notes`, data);
    }

    deleteNote(id: number) {
        return this.http.delete(`${this.baseURL}/hpe/notes/${id}`);
    }

    updateNote(id: number, data: any) {
        return this.http.put(`${this.baseURL}/hpe/notes/${id}`, data);
    }
}

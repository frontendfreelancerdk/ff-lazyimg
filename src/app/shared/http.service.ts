import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BackApi} from './BackApi';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getReadme(url: string) {
    const link = `${BackApi.protocol}://${BackApi.baseUrl}/assets/${url}/readme.md`;
    return this.http.get(link, {responseType: 'text'});
  }
}

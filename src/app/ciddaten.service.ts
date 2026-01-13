import { Injectable } from '@angular/core';
import { Ciddaten } from './ciddaten';

@Injectable({
  providedIn: 'root',
})
export class CiddatenService {
  readonly url = 'http://localhost:3000/ciddaten';
  async getAllCiddaten(): Promise<Ciddaten[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [] ;
  }
  async getCiddatenById(id: number): Promise<Ciddaten | undefined> {
    const data = await fetch(`${this.url}?id=${id}`);
    const ciddatenJson = await data.json();
    return ciddatenJson[0] ?? {};
  }
}

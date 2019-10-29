import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()

export class StarwarsService {

  items = [];
  pages = [];
  http: Http;
  signal = new Subject<void>();
  numberOfPages: number;

  constructor(http: Http) {
    this.http = http;
  }

  fetchData(type, page) {
    this.http.get('https://swapi.co/api/' + type + '/?page=' + page)
    .map((response: Response) => {
      const data = response.json();
      const numberOfPages = Math.ceil(data.count / (Math.ceil(data.results.length / 10) * 10));
      const extractedData = data.results;
      const items = extractedData.map((item) => {
        switch (type) {
          case 'people':
            return { name: item.name, height: item.height, mass: item.mass, gender: item.gender};
          case 'planets':
            return { name: item.name, terrain: item.terrain, population: item.population};
          case 'starships':
            return { name: item.name, model: item.model, hyperdrive_rating: item.hyperdrive_rating};
          case 'vehicles':
            return { name: item.name, model: item.model, max_atmosphering_speed: item.max_atmosphering_speed};
          case 'species':
            return { name: item.name, classification: item.classification, language: item.language};
          case 'films':
            return { name: item.title, episode_id: item.episode_id, release_date: item.release_date};
        }
      });
      return [items, numberOfPages];
    })
    .subscribe((data) => {
      this.items = data[0];
      this.numberOfPages = data[1];
      this.pages = [];
      for (let i = 1; i <= this.numberOfPages; i++) {
        this.pages.push(i);
      }
      setTimeout(this.signal.next(), 50);
    });
  }

  showItems() {
    return this.items.slice();
  }

  passPages() {
    return this.pages;
  }

}

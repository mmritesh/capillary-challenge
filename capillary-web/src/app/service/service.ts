import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams }  from '@angular/http';
import {DefinedConstants} from '../app.definedConstants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class Service {

  constructor(private http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  //--------------------------------------------

  getGames (): Observable<any> {

      let params: URLSearchParams = new URLSearchParams();

      let page = JSON.parse(sessionStorage.getItem('page'));
      params.set('pageNo', page.pageNo);
      params.set('noOfRows', page.noOfRows);
      params.set('sortBy', page.sortBy);
      params.set('sortOrder', page.sortOrder);

      return this.http.get(DefinedConstants.API_BASE_URL + DefinedConstants.GET_GAMES , { search: params } )
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  getGamesByName (name): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        let page = JSON.parse(sessionStorage.getItem('page'));
        params.set('pageNo', page.pageNo);
        params.set('noOfRows', page.noOfRows);
        params.set('sortBy', page.sortBy);
        params.set('sortOrder', page.sortOrder);

        return this.http.get(DefinedConstants.API_BASE_URL + DefinedConstants.GET_GAMES + "/" + name , { search: params } )
                        .map(this.extractData)
                        .catch(this.handleError);
    }

}

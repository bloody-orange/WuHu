/**
 * WuHu.WebService
 * No descripton provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';
import {HttpAuthService} from "../services/http-auth.service";

@Injectable()
export class PlayerApi {
    protected basePath = 'http://localhost:4649';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: HttpAuthService, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 
     * 
     */
    public playerGetAll (extraHttpRequestParams?: any ) : Observable<Array<models.Player>> {
        const path = this.basePath + '/api/player';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * 
     * 
     * @param playerId 
     */
    public playerGetById (playerId: number, extraHttpRequestParams?: any ) : Observable<models.Player> {
        const path = this.basePath + '/api/player/{playerId}'
            .replace('{' + 'playerId' + '}', String(playerId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'playerId' is not null or undefined
        if (playerId === null || playerId === undefined) {
            throw new Error('Required parameter playerId was null or undefined when calling playerGetById.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * 
     * 
     * @param username 
     */
    public playerGetByUsername (username: string, extraHttpRequestParams?: any ) : Observable<models.Player> {
        const path = this.basePath + '/api/player/{username}'
            .replace('{' + 'username' + '}', String(username));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'username' is not null or undefined
        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling playerGetByUsername.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * 
     * 
     * @param player 
     */
    public playerPostPlayer (player: models.Player, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/api/player';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'player' is not null or undefined
        if (player === null || player === undefined) {
            throw new Error('Required parameter player was null or undefined when calling playerPostPlayer.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(player);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * 
     * 
     * @param player 
     */
    public playerPutPlayer (player: models.Player, extraHttpRequestParams?: any ) : boolean | any {
        const path = this.basePath + '/api/player';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'player' is not null or undefined
        if (player === null || player === undefined) {
            throw new Error('Required parameter player was null or undefined when calling playerPutPlayer.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(player);
        console.log("put player");
        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return true;
                } else {
                    return false;
                }
            });
    }

}

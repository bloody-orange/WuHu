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

'use strict';
import * as models from './models';
import {SafeResourceUrl} from "@angular/platform-browser";

export interface Player {
    

    PlayerId?: number;

    Firstname?: string;

    Lastname?: string;

    Nickname?: string;

    Username?: string;

    IsAdmin?: boolean;

    PlaysMondays?: boolean;

    PlaysTuesdays?: boolean;

    PlaysWednesdays?: boolean;

    PlaysThursdays?: boolean;

    PlaysFridays?: boolean;

    PlaysSaturdays?: boolean;

    PlaysSundays?: boolean;

    Picture?: string;

    SafePicture?: SafeResourceUrl;

    CurrentRating?: models.Rating;
}
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
    private config!: AppConfig;
    loaded = false;
    constructor() {}
    loadConfig(): Promise<void> {
        return axios
            .get<AppConfig>('/assets/app.config.json')
            .then(data => {
                console.log(data.data);
                this.config = data.data;
                this.loaded = true;
            });
    }
    
    getConfig(): AppConfig {
        return this.config;
    }
}

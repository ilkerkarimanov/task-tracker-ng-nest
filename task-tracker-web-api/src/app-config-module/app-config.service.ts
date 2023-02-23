import { Injectable } from '@nestjs/common';
import { AppConfig } from './app-config';
import { readFileSync } from 'fs';

@Injectable()
export class AppConfigService {
  private config!: AppConfig;
  loaded = false;

  loadConfig(): void {
    this.config = JSON.parse(readFileSync('./assets/app.config.json', 'utf8'));
    console.log(JSON.stringify(this.config));
    this.loaded = true;
  }

  getConfig(): AppConfig {
    if (this.loaded === false) {
      this.loadConfig();
    }
    return this.config;
  }
}

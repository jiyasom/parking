import { SETTINGS } from './settings';
import npm from '../../package.json';

export const environment = {
  production: true,
  base_api:'http://localhost:3000/api/',
  appSettings: SETTINGS,
  googleMapApiKey: 'AIzaSyBSvo0x8v3C6aFWcSi2zooOC9tqGCOqCj4',
  version: npm.version
};

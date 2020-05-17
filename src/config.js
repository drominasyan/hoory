import { getDomain } from './helpers/getDomain';

const { hostname }       = window.location;

const DEV_API_PATH       = process.env.REACT_APP_DEV_API_PATH    || 'https://api.bmakers.site/v1/';

const PROD_API_PATH      = process.env.REACT_APP_PROD_API_PATH  ||  `https://api.${getDomain()}/v1`;


export const API_URL     = process.env.NODE_ENV === 'development' ? DEV_API_PATH : PROD_API_PATH;

export const apiAdminConfig = {
  apiProtocol : 'http',
  apiPort     : 3001,
};
export const apiAdminUploadPath = `${apiAdminConfig.apiProtocol}://${hostname}:${apiAdminConfig.apiPort}`;

export const siteConfig = {
  siteName   : 'Hoory',
  siteIcon   : 'female-1',
  footerText : 'OleoBet ©2018 Created by BetMakers',
};

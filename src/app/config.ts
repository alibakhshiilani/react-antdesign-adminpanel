export const Config = {
  baseUrl: process.env.REACT_APP_BASE_URL || 'https://adminpanel.api.com/',
  appName: process.env.REACT_APP_APP_NAME || 'Admin Panel',
  appLogo: process.env.REACT_APP_APP_LOGO,
  loginLogo: process.env.REACT_APP_APP_LOGO,
  googleMapToken: process.env.REACT_APP_GOOGLE_MAP_TOKEN,
  defaultHeader: {
    'Cache-Control': 'no-cache',
    crossDomain: 'true',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'fa',
    // ClientId: "panel.admin",
  },
  credential: {
    username: 'admin',
    password: 'admin',
  },
  getTokenApi: 'login',
  prefix: 'api/',
  publicPrefix: 'public/',
  apiVersionPrefix: 'v1/',
  setMultipleLang: false,
}

export default Config

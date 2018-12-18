export default {
  apiUrl: 'http://yoursite.com/api/',
};

const siteConfig = {
  siteName: 'AebiAdmin',
  siteIcon: 'ion-flash',
  footerText: 'Creole Studios ©2018 Created by Creole Studios',
};
const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';

const jwtConfig = {
  fetchUrl: '/api/',
  secretKey: 'secretKey',
};
const firebaseConfig = {
  apiKey: 'AIzaSyCINdoYaiXz4z2GBFP5FMrIZ520tbaR2aY',
  authDomain: 'test-project-a0955.firebaseapp.com',
  databaseURL: 'https://test-project-a0955.firebaseio.com',
  projectId: 'test-project-a0955',
  storageBucket: 'gs://test-project-a0955.appspot.com/',
  messagingSenderId: '907557487692'
};

export { siteConfig, language, themeConfig, jwtConfig, firebaseConfig };

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: '#795548',
        secondary: '#8bc34a',
        accent: '#2196F3',
        error: '#ff5722',
      }, 
      
      light: {
        primary: '#795548',
        secondary: '#8bc34a',
        accent: '#2196F3',
        error: '#ff5722',
      }
    }
  }
    
});

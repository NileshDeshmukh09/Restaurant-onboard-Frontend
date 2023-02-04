import Router from 'vue-router';
import HomePage from '../components/HomePage';

const router = new Router({
    mode: 'history',
    routes: [
      {
        name: 'HomePage',
        path: '/',
        component: HomePage,
        
      },   
      
    ],
  });
  
  export default router;
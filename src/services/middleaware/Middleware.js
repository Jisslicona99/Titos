 
import Cookies from 'js-cookie';

class Middleware {
    constructor() {
        this.token = this.checkAuth();
    }

    checkAuth() {
        const token = Cookies.get('access_token');
        const path = window.location.pathname;
 
        if (!token && path !== '/login' && path !== '/register') {
            window.location.href = '/login';
        } 
        return token;
    }
}

export default Middleware;
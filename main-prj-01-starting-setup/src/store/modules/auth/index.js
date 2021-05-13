let timer;
const AuthModule = {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    }
  },
  actions: {
    async auth(context, payload) {
      const mode = payload.mode;
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVd7rkMOrNhKxXoEcKAX7GimGmPrCidcc';

      if (mode === 'signup') {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVd7rkMOrNhKxXoEcKAX7GimGmPrCidcc';
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      });
      const responseData = await response.json();
      console.log(response);
      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message || 'Failed to log in. Check your login data.'
        );
        throw error;
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(function() {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 10000) {
        return;
      }
      timer = setTimeout(function() {
        context.dispatch('autoLogout');
      }, expiresIn);
      if (token && userId) {
        context.commit('setUser', {
          token: token,
          userId: userId,
        });
      }
    },
    async login(context, payload) {
      context.dispatch('auth', {
        ...payload,
        mode: 'login'
      });
    },
    async signup(context, payload) {
      context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      });
    },
    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);
      context.commit('setUser', {
        userId: null,
        token: null
      });
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }
  }
};

export default AuthModule;

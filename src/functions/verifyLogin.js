export function verifyCookie() {

    getMyValue = async () => {
        try {
          const cookie = await AsyncStorage.getItem('@cookie')
          const username = await AsyncStorage.getItem('@username');
          const email = await AsyncStorage.getItem('@email');

          accountPromise = await fetch('https://warm-meadow-74730.herokuapp.com/cookieauth', {
          method: 'GET',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'mcookie': cookie,
          'username': username,
          },
        }).then((promise) => { return promise.json();})
        .then(res => {
            //returns fetched json
            return res;
        }).catch(error => {
            return {isLoggedIn: false}
        })
          
        } catch(e) {
          return {isLoggedIn: false};
        }
      
        console.log('Done')
      
      }

    getMyValue();
}
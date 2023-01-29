const passport =require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {//인증과정을 통해 얻은 사용자 정보가 user로 들어간다.
    console.log('serializeUser', user.id)
    done(null, user.id); 
  });
  //done이 호출되면 session에 저장되고 deserializeUser를 호출한다.

 
  passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id)
    console.log(1)
    done(null, id)
    console.log(2)
  }); 
  // 호출되면 매번 req.user객체를 만든다. 그래서 user정보를 sql보낸 후 담는다.
  // 매 요청시마다 실행되기 때문에 쿠키세션이 있는 한 req.user를 계속 쓸 수 있다는 뜻이된다. 
  // 이 말은 로그인된 상태다. - 한승보
  
  local();
}


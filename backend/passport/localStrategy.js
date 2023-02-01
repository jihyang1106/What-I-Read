const passport = require('passport');
const localStrategy = require('passport-local').Strategy; //이메일(id)과 비밀번호로 로그인하는 걸 도와주는 전략
// const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = () => {
  //로그인정보가 있는지 확인하는 거까지가 전략이다. 로그인정보를 세션에 저장하는 것은 그 다음 serializeUser에서 한다,
  passport.use(
    new localStrategy(
      {
        usernameField: 'id', //req.body.id
        passwordField: 'password', //req.body.pw
      },
      async (id, password, done) => { //로그인하는 전략 함수
        console.log(id, password);
        try {
          const exUser = await User.findOne({ where: { id: id } });
          console.log('exUser', exUser);
          if (exUser) {
            //const result = await bcrypt.compare(pw, exUser.pw);
            //console.log(exUser)
            const result = password == exUser.pw ? true : false;
            if (result) {
              done(null, exUser);
            } else {
              console.log(exUser);
              console.log(id);
              console.log(typeof password);
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            console.log(exUser);
            console.log(id);
            console.log(password);
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

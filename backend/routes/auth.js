const express = require('express');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router();

/**회원가입 라우터 - 한승보 */
router.post('/signup', async (req, res, next) => {
  const { id, nickname, password, phone, name } = req.body;
  console.log(req.body);

  try {
    const exUser = await User.findOne({ where: { id: id } });
    const exnickName = await User.findOne({ where: { nickName: nickname } });

    if (exUser) {
      return res.send('존재하는 ID입니다.');
    }
    if (exnickName) {
      return res.send('존재하는 닉네임입니다.');
    }
    //const hash = await bcrypt.hash(pw, 12);
    await User.create({
      id: id,
      nickName: nickname,
      pw: password,
      phone,
      name,
    });
    return res.send(true);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/**로그인 라우터 -한승보 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.send(info.message);
    }
    return req.login(user, (loginError) => {
      //req.login 메서드가 passport.serializeUser() 호출
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log(user.dataValues);
      delete user.dataValues.pw;
      return res.send(user);
    });
  })(req, res, next); //미들웨어 내에 미들웨어
});
router.get('/a', (req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  return res.send(true);
});

module.exports = router;

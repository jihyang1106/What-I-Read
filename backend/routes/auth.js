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
    console.log('req.body', req.body);
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

/**회원정보수정 : 지향*/
router.patch('/updateUser', async (req, res) => {
  console.log('req.body', req.body);
  let data = {
    pw: req.body.data.password,
    name: req.body.data.name,
    phone: req.body.data.phone,
    nickName: req.body.data.nickname,
  };

  const result = await User.update(data, {
    where: { id: req.body.data.id },
  });

  let userInfo = {
    id: req.body.data.id,
    name: req.body.data.name,
    phone: data.phone,
    nickname: data.nickName,
  };
  res.send(userInfo);
});

/**로그아웃 : 지향 */
router.delete('/logout', async (req, res, next) => {
  console.log('프론트에서 넘어온 id값', req.body.id);

  req.logout();
  // DB에서 삭제
  let result = await User.destroy({
    where: { id: req.body.id },
  });

  console.log('삭제 result', result);
  res.send(result);
});

module.exports = router;

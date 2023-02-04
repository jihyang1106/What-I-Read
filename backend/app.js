const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const app = express();
const cors = require('cors'); // 다른 주소끼리 ajax 요청 주고받을 때 필요

app.set('port', process.env.PORT || 5000);
//app.set('views', path.join(__dirname, 'views'));

/** React와 Node.js 서버간 ajax 요청 원활히 하기 위해 */
app.use(express.json()); // 유저가 보낸 array/object 데이터 출력하기 위해 필요

app.use(
  cors({
    origin: ['http://118.67.143.160:3000', 'http://localhost:3000'],
    credentials: true,
  })
);

sequelize
  .sync({ force: false }) // force : false
  .then(() => {
    console.log('데이터베이스 연결됨.');
  })
  .catch((err) => {
    console.error(err);
  });

passportConfig();

app.use(morgan('dev')); // 로그
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: true })); // uri 파싱

const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');
const aladinRouter = require('./routes/aladin');

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: '123',
  })
);
app.use(passport.initialize());
app.use(passport.session()); //deserializeUser호출 -> 실행되면 req객체에 passport정보 추가저장 -> req.user

app.use('/auth', authRouter);
app.use('/book', bookRouter);
app.use('/aladin', aladinRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

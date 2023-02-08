const Sequelize = require('sequelize');

const User = require('./User');
const BookReport = require('./BookReport');
const Comment = require('./Comment');

//데이터베이스 설정을 불러온다고 말할 수 있다.
const config = require('../config/config.json')['development'];

const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize;

db.User = User;
db.BookReport = BookReport;
db.Comment = Comment;

User.init(sequelize);
BookReport.init(sequelize);
Comment.init(sequelize);
//init메서들 실행시켜 테이블 생성

User.associate(db);
BookReport.associate(db);
Comment.associate(db);

// 모듈로 꺼낸다.
module.exports = db;

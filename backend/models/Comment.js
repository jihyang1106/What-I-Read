const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 첫번째 객체 인수는 테이블 필드에 대한 설정
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Comment',
        tableName: 'Comment',
        freezeTableName: true,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  // 다른 모델과의 관계
  static associate(db) {
    // 인자로 index.js에서 만든 여러 테이블이 저장되어있는 db객체를 받을 것이다.
    db.Comment.belongsTo(db.User, {
      foreignKey: 'User_id',
      sourceKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.Comment.belongsTo(db.BookReport, {
      foreignKey: 'BookReport_id',
      sourceKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = Comment;

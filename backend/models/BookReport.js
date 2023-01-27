const Sequelize = require('sequelize');
 
class BookReport extends Sequelize.Model {
 
   // 스태틱 메소드
   // 테이블에 대한 설정
   static init(sequelize) {
 
      return super.init(
         {  // 첫번째 객체 인수는 테이블 필드에 대한 설정
            title: {
              type : Sequelize.STRING(100),
              allowNull : false,
            },
            content: {
              type: Sequelize.TEXT,
              allowNull: false,
            },
            link: {
              type: Sequelize.TEXT,
              allowNull: false,
            },
            cover: {
              type: Sequelize.TEXT,
              allowNull: false,
            },
            categoryName : {
              type: Sequelize.TEXT,
              allowNull: false,
            }
         },
         {  
            sequelize, 
            timestamps: false, 
            underscored: false, 
            modelName: 'BookReport', 
            tableName: 'BookReport',
            freezeTableName: true,
            paranoid: false, 
            charset: 'utf8', 
            collate: 'utf8_general_ci'
         }
      );
   }
 
   // 다른 모델과의 관계
   static associate(db) { // 인자로 index.js에서 만든 여러 테이블이 저장되어있는 db객체를 받을 것이다.
      db.BookReport.belongsTo(db.User, { foreignKey: 'User_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
   }
};
 
module.exports = BookReport;
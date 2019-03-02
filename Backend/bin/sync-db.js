const models = require('../models');

// force : true -> DB가 있더라도 날려버리고 새로 만든다.
models.sequelize.sync({force: true});

module.exports = () => {
    // force true면 기존에 있던 db 값을 날림
    const options = {
        force : process.env.NODE_ENV == 'test' ? true : false
    }
    return models.sequelize.sync(options); // 내부적으로 Promis호출
}
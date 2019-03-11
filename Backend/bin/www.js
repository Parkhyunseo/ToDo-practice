const app = require('../index');
// 서버가 돌기 전에 db와 sync
const syncDB = require('./sync-db');

syncDB().then(_ => {
    console.log('Sync database!');
    app.listen(8080, function(){
       console.log('Server is running on 8080 port');
    });
})


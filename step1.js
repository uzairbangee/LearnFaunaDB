const faunaDB = require('faunadb'),
    q = faunaDB.query;
require('dotenv').config();

const adminClient = new faunaDB.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });

(async () => {
    if (process.env.FAUNADB_ADMIN_SECRET) {
        try {
            const result = await adminClient.query(
                q.CreateKey({
                  database: q.Database('my_app'),
                  role: 'server',
                })
            )
    
            console.log(result);
        }
        catch(err) {
            console.log(err)
        }
    }
    else{
        console.log('error')
    }
})();


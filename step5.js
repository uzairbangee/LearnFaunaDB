const faunaDB = require('faunadb'),
    q = faunaDB.query;
require('dotenv').config();

const serverClient = new faunaDB.Client({ secret: process.env.FAUNADB_ADMIN_SECRET_KEY });

(async () => {
    if (process.env.FAUNADB_ADMIN_SECRET_KEY) {
        try {
            const result = await serverClient.query(
                q.Create(
                  q.Ref(q.Collection('posts'), '1'),
                  { data: { title: 'WPrefer to use serverless' } },
                )
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

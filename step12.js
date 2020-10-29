const faunaDB = require('faunadb'),
    q = faunaDB.query;
require('dotenv').config();

const serverClient = new faunaDB.Client({ secret: process.env.FAUNADB_ADMIN_SECRET_KEY });

(async () => {
    if (process.env.FAUNADB_ADMIN_SECRET_KEY) {
        try {
            const result = await serverClient.query(
                q.Map(
                    q.Ref(q.Collection('posts'),
                    q.Lambda('post', q.Get('post')
                    ))
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

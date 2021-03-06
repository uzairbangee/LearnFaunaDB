const faunaDB = require('faunadb'),
    q = faunaDB.query;
require('dotenv').config();

const serverClient = new faunaDB.Client({ secret: process.env.FAUNADB_ADMIN_SECRET_KEY });

(async () => {
    if (process.env.FAUNADB_ADMIN_SECRET_KEY) {
        try {
            const result = await serverClient.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection('posts'))),
                    q.Lambda('post', q.Get(q.Var('post'))
                    ))
                )
            
            console.log(result.data);
        }
        catch(err) {
            console.log(err)
        }
    }
    else{
        console.log('error')
    }
})();

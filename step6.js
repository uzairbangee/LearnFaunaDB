const faunaDB = require('faunadb'),
    q = faunaDB.query;
require('dotenv').config();

const serverClient = new faunaDB.Client({ secret: process.env.FAUNADB_ADMIN_SECRET_KEY });

(async () => {
    if (process.env.FAUNADB_ADMIN_SECRET_KEY) {
        try {
            const result = await serverClient.query(
                q.Map([
                    'My cat and other marvels',
                    'Pondering during a commute',
                    'Deep meanings in a latte',
                ],
                q.Lambda('post_title',
                    q.Create(
                        q.Collection('posts'),
                        { data: { title: q.Var('post_title') } },
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

const faunaDB = require('faunadb'),
    q = faunaDB.query;
require('dotenv').config();

const serverClient = new faunaDB.Client({ secret: process.env.FAUNADB_ADMIN_SECRET_KEY });

(async () => {
    if (process.env.FAUNADB_ADMIN_SECRET_KEY) {
        try {
            const result = await serverClient.query(
                q.Create(
                  q.Collection('posts'),
                  { data: { title: 'What I had fosssfdfsdfr breakfast ..' } },
                )
            )
    
            console.log(result.ref);
        }
        catch(err) {
            console.log(err)
        }
    }
    else{
        console.log('error')
    }
})();

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
                    q.Lambda('post', 
                    q.Let(
                        {
                            mypost : q.Get(q.Var("post"))
                        },
                        {
                            id: q.Select(["ref", "id"], q.Var("mypost")),
                            name: q.Select(["data", "title"], q.Var("mypost")),
                            tags : q.Select(["data", "tags"], q.Var("mypost"))
                        }
                    )
                    ))
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

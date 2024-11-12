require('dotenv').config()

const express = require('express')

const app = express()

//const port = 4000

const githubData = 
    {
        "login": "pranavyamjal",
        "id": 69851016,
        "node_id": "MDQ6VXNlcjY5ODUxMDE2",
        "avatar_url": "https://avatars.githubusercontent.com/u/69851016?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/pranavyamjal",
        "html_url": "https://github.com/pranavyamjal",
        "followers_url": "https://api.github.com/users/pranavyamjal/followers",
        "following_url": "https://api.github.com/users/pranavyamjal/following{/other_user}",
        "gists_url": "https://api.github.com/users/pranavyamjal/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/pranavyamjal/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/pranavyamjal/subscriptions",
        "organizations_url": "https://api.github.com/users/pranavyamjal/orgs",
        "repos_url": "https://api.github.com/users/pranavyamjal/repos",
        "events_url": "https://api.github.com/users/pranavyamjal/events{/privacy}",
        "received_events_url": "https://api.github.com/users/pranavyamjal/received_events",
        "type": "User",
        "user_view_type": "public",
        "site_admin": false,
        "name": "Pranav Yamjal",
        "company": null,
        "blog": "",
        "location": "Pune,Maharashtra,India",
        "email": null,
        "hireable": true,
        "bio": "Exlploring the coding universe",
        "twitter_username": "pranavyamjal",
        "public_repos": 8,
        "public_gists": 0,
        "followers": 2,
        "following": 4,
        "created_at": "2020-08-18T11:45:25Z",
        "updated_at": "2024-11-01T03:28:37Z"
      }


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
    res.send('pranavyamjal')
})

app.get('/login',(req,res) => {
    res.send('<h1>Please Login!!!!!!!!</h1>')
})

app.get('/github', (req, res) => {
    res.send(githubData)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
const PORTNUM = 8089;

const express = require('express');
const https = require('https');
const cors = require('cors');
const parser = require('body-parser');

const creds = require('./variables.js');
const users = require('./users.js');
const tags = require('./tags.js');
const events = require('./events.js');

const app = express();

app.use(cors());
app.use(parser.json());

const grant_type= "authorization_code";
const redirect_uri= "http://localhost:8991/auth";
const client_id= creds["client_id"];
const client_secret= creds["client_secret"];

const dbUsers = users["userLists"];
const dbTags = tags["tagLists"];
const dbEvents = events["eventsList"];

const attendeesMax = 10;

app.get('/', (req, res)=>{
  return res.status(200).json({
    "message": "hello!", 
    "success": "OK",
  });
});

app.get("/verifyuser", (req, res) => {
  const headers = req.headers;
  if (!headers["authorization"]) {
    return res.status(400).json({"success": false});
  } 
  const bearer = headers["authorization"].split("Bearer ");
  if (bearer.length < 1) {
    return res.status(400).json({"success": false});
  }
  const token = bearer[1];
  // check in db
  const thisUser = dbUsers.filter(user => {
    return token === user._id;
  });
  if (thisUser.length!==1) {
    return res.status(200).json({"route": "/newuser"});
  } else {
    return res.status(200).json({"route": "/events"});
  } 

});

app.get("/tags", (req, res) => {
  return res.status(200).json({"tagsList": dbTags });
});

app.get("/events", (req, res) => {
  let eventsList = dbEvents.map(event=>{
    const attendees = dbUsers.slice(0, attendeesMax).map(user=>{
      return user.avatar;
    });
    return { 
      "id": event.id,
      "date": event.date,
      "title": event.title,
      "where": event.where,
      "tags": event.tags,
      "attendees": attendees,
    };
  });
  return res.status(200).json({"eventsList": eventsList });
});

app.get("/event/:id", (req, res) => {
  const eventId = req.params.id;
  const event = dbEvents.filter(event=>{
    return event.id === eventId;
  });
  const attendees = dbUsers.slice(0, attendeesMax).map(user=>{
    return {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "major": user.major,
      "gradYear": user.gradYear,
      "interest": user.interest,
      "avatar": user.avatar,
    };
  });
  let eventDetails = event[0];
  eventDetails["attendees"] = attendees
  return res.status(200).json({"details": eventDetails})
});

app.get("/users", (req, res) => {
  const headers = req.headers;
  if (!headers["authorization"]) {
    return res.status(400).json({"success": false});
  } 
  const bearer = headers["authorization"].split("Bearer ");
  if (bearer.length < 1) {
    return res.status(400).json({"success": false});
  }
  const token = bearer[1];
});

app.post("/newuser", (req, res)=>{
  const headers = req.headers;
  if (!headers["authorization"]) {
    return res.status(400).json({"success": false});
  } 
  const bearer = headers["authorization"].split("Bearer ");
  if (bearer.length < 1) {
    return res.status(400).json({"success": false});
  }
  const token = bearer[1];
  console.log(token)
  const selectedTags = req.body.selectedTags;

  console.log(selectedTags)

  return res.status(200).json({"route": "/events"});

});



app.get('/auth', function (req, res) {
 
  let query = req.query;
  //console.log(req.query);
  let code = query.code;
  if (!code) {
    return res.redirect('http://localhost:8991/auth');
  }
 
  const opts = '?grant_type='+grant_type+'&redirect_uri='+redirect_uri+'&client_id='+client_id+'&client_secret='+client_secret+'&code='+code;

  const options = {
      host: 'www.linkedin.com',
      path: '/oauth/v2/accessToken'+opts,
      protocol: 'https:',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      }
  };
    
  let reqq = https.request(options, (ress) => {
      let str = '';
      ress.setEncoding('utf8');
      ress.on('data', (chunk) => {
          str += chunk;
      });
      ress.on('end', async () => {
        const data = JSON.parse(str);
        //console.log(data);
        if (data["access_token"]) {
          
          let reqProfile = https.request({
            host: 'api.linkedin.com',
            path: '/v2/me',
              protocol: 'https:',
              method: 'GET',
              headers: {
                  'Authorization': "Bearer "+data["access_token"],
                  //'Authorization': headers["authorization"].replace("A","a"),
                  //'Authorization': 'Basic '+headers["authorization"].split("Bearer ")[1],
              }
          }, (resProfile) => { 
             let str = '';
              resProfile.setEncoding('utf8');
              resProfile.on('data', (chunk) => {
                  str += chunk;
              });
              resProfile.on('end', () => {
                //console.log(str);
                const dataProfile = JSON.parse(str);
                if (dataProfile["status"] && dataProfile["status"]!==200) {
                  return res.status(400).json({"done": false});
                } else {
                  //console.log("data:",dataProfile);
                  return res.status(200).json({
                    "done": true, 
                    "token": dataProfile["id"],
                    "profile": {
                      "firstName": dataProfile["localizedFirstName"],
                      "lastName": dataProfile["localizedLastName"],
                    }
                  });
                }
              });
              reqProfile.on('error', () => { return null; });
          });
          reqProfile.end();

          //return res.status(200).json({"done": true, 'x-token': data["access_token"] });
        } else {
          return res.status(400).json({"done": false});
        }
      });
  });
  reqq.end();

});



/*
app.get('/getprofile', (req, res) => {
  const headers = req.headers;
  if (!headers["authorization"]) {
    return res.status(400).json({"success": false});
  } else {
    let reqq = https.request({
      host: 'api.linkedin.com',
      path: '/v2/me',
        protocol: 'https:',
        method: 'GET',
        headers: {
            'Authorization': headers["authorization"],
            //'Authorization': headers["authorization"].replace("A","a"),
            //'Authorization': 'Basic '+headers["authorization"].split("Bearer ")[1],
        }
    }, (ress) => { 
       let str = '';
        ress.setEncoding('utf8');
        ress.on('data', (chunk) => {
            str += chunk;
        });
        ress.on('end', () => {
          //console.log(str);
          const data = JSON.parse(str);
          if (data["status"] && data["status"]!==200) {
            return res.status(400).json({"success": false});
          } else {
            return res.status(200).json(JSON.parse(str));
          }
        });
    });
    reqq.end();
  }
});
//*/


app.listen(process.env.PORT || PORTNUM, ()=>{console.log("listening on port",PORTNUM)});


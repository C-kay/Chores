const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./Permissions.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chores-561a7.firebaseio.com"
});

const app = express();
app.use(cors({origin: true}));

const db = admin.firestore();


//Get 

app.get("/test", (req, res) => {
    res.send("we are out here")
});


app.post('/getuser/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('Users').doc(req.params.id);
            let user = await document.get();
            let repoonse = user.data();
            return res.status(200).send(repoonse);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })();
});


app.get('/getallusers', (req, res) => {
    (async () => {
        try {
            const query = db.collection('Users');
            const response = [];
            await query.get().then((snapshot) => {
                const docs = snapshot.docs;
                for (let element of docs) {
                    let hold = {
                        firstname: element.data().firstname,
                        lastname: element.data().lastname,
                        password: element.data().password
                    };
                    response.push(hold);
                }
                return response;
            });
            return res.status(200).send(response);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })();
});


//create : post
app.post('/createuser', (req, res) => {
    (async () => {
        try {
            await db.collection('Users').doc().create({ //you can also use doc(currentUser.uid).set(currentuser)
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password
            });
            return res.status(200).send();
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })();
});


//update: put
app.put('/updateuser/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('Users').doc(req.params.id);
            await document.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password
            });
            return res.status(200).send();
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })();
});


//delete: delete
app.delete('/deleteuser/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('Users').doc(req.params.id);
            await document.update();
            return res.status(200).send();
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })();
});

//learning query
app.get('/learn', (req, res) => {
    (async () => {
        try {
            const document = db.collection('Users');
            await document.where('firstname', "==", "charle").
            return res.status(200).send();
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })();
});



exports.app = functions.https.onRequest(app);

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../Permissions.json'; 
import * as express from 'express';
import * as cors from 'cors';



const params = serviceAccount as object;

//Initialize admin
//admin.initializeApp();
admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: "https://chores-561a7.firebaseio.com"
  });

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const appp = express();
appp.use(cors({origin : true}));

// appp.use(function (req, res, next) {        
//     res.setHeader('Access-Control-Allow-Origin', '*');    
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
//     res.setHeader('Access-Control-Allow-Credentials', 'true');       
//     next();  
// }); 

const db = admin.firestore();

//read: get
appp.get('/test', (req, res) => {

    try{
        return res.status(200).send("I am working");

    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }  
    
});

appp.post('/getuser', (req, res) => {

    async()=>{
        try{
            const document = db.collection('Users').doc(req.params.id);
            let user = await document.get();
            let repoonse = user.data();
            return res.status(200).send(repoonse);

        }catch(err){
            console.log(err);
            return res.status(500).send(err);
        }
    }   
    
});

appp.get('/getallusers', (req, res) => {

    async()=>{
        try{
            const query  = db.collection('Users');
            let response: object[]= [];
            
            await query.get().then((snapshot)=> {
                let docs = snapshot.docs;
                
                for(let element of docs){
                    
                    const hold ={
                        firstname : element.data().firstname,
                        lastname: element.data().lastname,
                        password: element.data().password
                    };
                    response.push(hold);
                }

                return response;
            });

            return res.status(200).send(response);
            
        }catch(err){
            console.log(err);
            return res.status(500).send(err);
        }
    }   
    
});


//create : post

appp.post('/createuser', (req, res) => {

    async()=>{
        try{
            await db.collection('Users').doc().create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password
            });
            return res.status(200).send();
        }catch(err){
            console.log(err);
            return res.status(500).send(err);
        }
    }   
    
});

//update: put

//delete: delete


export const app = functions.https.onRequest(appp);


    





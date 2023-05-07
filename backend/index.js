const express = require("express");
const app = express();
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { request } = require("https");
const port = 4000;
const mailer = require('nodemailer');


const PATH = "./public/images";
const upload = multer({
  storage: multer.diskStorage({
    destination: PATH,
    filename: function (req, file, cb) {
      let origialname = file.originalname;
      let ext = origialname.split(".").pop();
      let filename = origialname.split(".").slice(0, -1).join(".");
      cb(null, filename + "." + ext);
    },
  }),
});

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_vote",
  port: 3306,
});

// Check Database Connection

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Database Connected");
});

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log("Server is Running");
});

app.get("/Add", (req, res) => {
  res.send({
    message: "Hai",
  });
});

app.post("/District", (req, res) => {
  let qry3 =
    "insert into tbl_district (district_name) values('" +
    req.body.district_name +
    "')";
  db.query(qry3, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});


//Adminprofile

app.get("/Adminprofile/:id", (req, res) => {
  let id = req.params.id;
  let qry15 = "select * from tbl_admin where admin_id=" + id;
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Adminprofile: result,
      });
    else {
      res.send({
        Adminprofile: [],
      });
    }
  });
});


//District delete

app.delete("/District/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "delete from tbl_district where district_id='" + id + "' ";
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});

//District select

app.get("/District", (req, res) => {
  let qry15 = "select * from tbl_district";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        district: result,
      });
    }
    else {
      res.send({
        district: [],
      });
    }
  });
});

//district ajax
app.get("/Condition_subport/:id/:sid", (req, res) => {
  console.log(req.params);
  const sid = req.params.id;
  const did = req.params.sid;

  let qry15 =
    "select * from tbl_sectionsubport where district_id='" +
    did +
    "' and sectionport_id='" +
    sid +
    "'";

  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        subsection: result,
      });
    }
    else {
      res.send({
        subsection: [],
      });
    }
  });
});

app.get("/Condition_ward/:id", (req, res) => {
  console.log(req.params);
  const sid = req.params.id;

  let qry15 =
    "select * from tbl_ward where  sectionsubport_id='" +
    sid +
    "'";

  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        Condition_ward: result,
      });
    }
  });
});


app.post("/Ward", (req, res) => {
  let qry4 =
    "insert into tbl_ward (ward_name,sectionsubport_id) values('" +
    req.body.ward_name +
    "','" +
    req.body.sectionsubport_id +
    "')";
  db.query(qry4, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

//select ward

app.get("/Ward", (req, res) => {
  let qry15 =
    "select * from tbl_Ward w inner join tbl_sectionsubport ssp on w.sectionsubport_id=ssp.sectionsubport_id";
  db.query(qry15, (err, result) => {
    console.log(qry15);
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        ward: result,
      });
   
    else {
      res.send({
        ward: [],
      });
    }
  });
});






app.get("/WardSelect/:id", (req, res) => {
  let id = req.params.id;
  let qry15 = "select * from tbl_election e inner join tbl_assignagent ag on ag.election_id=e.election_id inner join tbl_electionagent ea on ea.electionagent_id=ag.electionagent_id inner join tbl_ward agw on agw.ward_id=ag.ward_id inner join tbl_sectionsubport ssp on ssp.sectionsubport_id=agw.sectionsubport_id where ag.ward_id in (SELECT ward_id from tbl_ward  WHERE sectionsubport_id=(select w.sectionsubport_id from tbl_user u inner join tbl_ward w on w.ward_id=u.ward_id WHERE u.user_id=" + id + "))";

  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      result.map((dat, key) => {
        let qry18 = "SELECT * from tbl_candidate c inner join tbl_user u on u.user_id=c.user_id where c.ward_id=" + dat.ward_id +" and c.candidate_status = 2"
        db.query(qry18, (err, result2) => {
          result[key].candidate = result2;
          if (key === result.length - 1) {
            res.send({
              WardSelect: result,
            });
          }
        });
      })

    }
    else {
      res.send({
        WardSelect: [],
      });
    }
  });
});


app.get("/selcandidate/:id", (req, res) => {
  let id = req.params.id;
  let qry15 = "select * FROM tbl_election e inner join tbl_assignagent a on e.election_id=a.election_id inner join tbl_candidate cc on a.ward_id=cc.ward_id inner join tbl_user uu on cc.user_id=uu.user_id WHERE a.ward_id in( SELECT ward_id from tbl_ward where sectionsubport_id=(select ss.sectionsubport_id from tbl_user u INNER JOIN tbl_ward w on u.ward_id=w.ward_id INNER JOIN tbl_sectionsubport ss on ss.sectionsubport_id=w.sectionsubport_id where u.user_id=" + id + "))"

  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        selcandidate: result,
      });

    else {
      res.send({
        selcandidate: [],
      });
    }
  });
});


//ward delete

app.delete("/Ward/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "delete from tbl_ward where ward_id='" + id + "' ";
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});

//insert Sectionport

app.post("/Sectionport", (req, res) => {
  let qry5 =
    "insert into tbl_sectionport (sectionport_name) values('" +
    req.body.sectionport_name +
    "')";
  db.query(qry5, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

//select Sectionport

app.get("/Sectionport", (req, res) => {
  let qry15 = "select * from tbl_sectionport";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Sectionport: result,
      });
    else {
      res.send({
        Sectionport: [],
      });
    }
  });
});

//delete sectionport

app.delete("/Sectionport/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "delete from tbl_sectionport where sectionport_id='" + id + "' ";
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});

//Sectionsubport insert
app.post("/Sectionsubport", (req, res) => {
  let qry6 =
    "insert into tbl_sectionsubport (sectionsubport_name,sectionport_id,district_id) values('" +
    req.body.sectionsubport_name +
    "','" +
    req.body.sectionport_id +
    "','" +
    req.body.district_id +
    "')";
  db.query(qry6, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        sectionsubport: "Data Saved",
      });
    }
  });
});

//Sectionsubport select

app.get("/Sectionsubport", (req, res) => {
  let qry14 =
    "select * from tbl_sectionsubport ssp inner join tbl_district d on d.district_id=ssp.district_id inner join tbl_sectionport sp on sp.sectionport_id=ssp.sectionport_id";
  db.query(qry14, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        sectionsubport: result,
      });
    else {
      res.send({
        sectionsubport: [],
      });
    }
  });
});

//Sectionsubport delete

app.delete("/Sectionsubport/:id", (req, res) => {
  let id = req.params.id;
  let qry16 =
    "delete from tbl_sectionsubport where sectionsubport_id='" + id + "' ";
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});

// user registration
app.post(
  "/User",
  upload.fields([
    { name: "user_photo", maxCount: 1 },
    { name: "user_proof", maxCount: 1 },
  ]),
  (req, res) => {
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.user_photo[0].filename}`;
    var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.user_proof[0].filename}`;
    let email = req.body.user_email;
    let vnum =req.body.VerNum;
    let qry7 =
      "insert into tbl_user (user_name,user_address,user_gender,user_voterid,user_photo,user_proof,user_email,user_password,ward_id) values('" +
      req.body.user_fname + " " + req.body.user_lname +
      "','" +
      req.body.user_address +
      "','" +
      req.body.user_gender +
      "','" +
      req.body.user_voterid +
      "','" +
      profileimgsrc +
      "','" +
      proofimgsrc +
      "','" +
      req.body.user_email +
      "','" +
      req.body.user_password +
      "','" +
      req.body.ward_id +
      "')";
    db.query(qry7, (err, result) => {
      if (err) {
        console.log("Error");
      } else {
        let content=`
<html>
<head>
    <title>OTP Email</title>
    <style>
        /* Define the style for the container */
        .container {
            width: 90%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f2f2f2;
            font-family: Arial, sans-serif;
        }

        /* Define the style for the OTP box */
        .otp-box {
            width: 90%;
             max-width: 600px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
        }

        /* Define the style for the OTP text */
        .otp-text {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
        }

        /* Define the style for the OTP number */
        .otp-number {
            font-size: 48px;
            font-weight: bold;
            color: #007bff;
            margin-top: 10px;
        }

        /* Define the style for the instructions text */
        .instructions {
            font-size: 14px;
            color: #666666;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <!-- Display OTP in an improved email view -->
    <div class="container">
        <div class="otp-box">
            <div class="otp-text">One-Time Password (OTP)</div>
            <div class="otp-number">${vnum}</div>
            <div class="instructions">Please use the above OTP to verify your account.</div>
        </div>
    </div>
</body>
</html>
`;        
          sendEmail(email,content); 
          let qry10="select max(user_id) as id from  tbl_user"    
          db.query(qry10, (err, result2) => { 
            if (err) {
              console.log("Error");
            } else {
              res.send({
                 us_id:result2,
                 message: "inserted successfully",

              });

            }
           });
          
         
      }
    }); 
  }
);

//Resent Otp
app.post("/ResentOtp", (req, res) => {
  let email = req.body.email;
  let vnum =req.body.VerNum;
  let content=` 
 <html>
<head>
    <title>OTP Email</title>
    <style>
        /* Define the style for the container */
        .container {
            width: 90%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f2f2f2;
            font-family: Arial, sans-serif;
        }

        /* Define the style for the OTP box */
        .otp-box {
            width: 90%;
             max-width: 600px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
        }

        /* Define the style for the OTP text */
        .otp-text {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
        }

        /* Define the style for the OTP number */
        .otp-number {
            font-size: 48px;
            font-weight: bold;
            color: #007bff;
            margin-top: 10px;
        }

        /* Define the style for the instructions text */
        .instructions {
            font-size: 14px;
            color: #666666;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <!-- Display OTP in an improved email view -->
    <div class="container">
        <div class="otp-box">
            <div class="otp-text">One-Time Password (OTP)</div>
            <div class="otp-number">${vnum}</div>
            <div class="instructions">Please use the above OTP to verify your account.</div>
        </div>
    </div>
</body>
</html> `;   
  sendEmail(email,content);   
      res.send({
        sectionsubport: "Data Saved",
      });
  
});


var transporter = mailer.createTransport({
  service: "gmail",
  auth: {
      user: "contact.democratech@gmail.com", //from email Id
      pass: "czdslupvcqwxjwyc", // App password created from google account
  },
});
function sendEmail(to, content) {
  const mailOptions = {
      from: "contact.democratech@gmail.com", //from email Id for recipient can view
      to,
      subject: "Verification",
      html: content,
      
  };
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log("Email sented");
      }
  });
}

//user email accept
app.post("/UserEmailAccept/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "update tbl_user set user_status = '1' where user_id=" + id;
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "updated",
      });
    }
  });
});



//user Accept

app.post("/UserAccept/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "update tbl_user set user_status = '2' where user_id=" + id;
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "updated",
      });
    }
  });
});

//user reject

app.post("/UserReject/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "update tbl_user set user_status = '0' where user_id=" + id;
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "updated",
      });
    }
  });
});

//select user


app.get("/User", (req, res) => {
  let qry14 = "select * from tbl_user";
  db.query(qry14, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        user: result,
      });
    else {
      res.send({
        user: [],
      });
    }
  });
});

//edit user profile

app.post("/UserEdit/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "update tbl_user set user_name ='"+req.body.user_name+"', user_email ='"+req.body.user_email+"', user_address ='"+req.body.user_address+"' where user_id=" + id;
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "updated",
      });
    }
  });
});

//edit password user profile
app.post("/UserPass/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "update tbl_user set user_password ='"+req.body.user_password+"' where user_id=" + id;
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "updated",
      });
    }
  });
});


//user validation

app.get("/UserValidation/:email", (req, res) => {
  let email=req.params.email;
  let qry14 = "select * from tbl_user where user_email= '" +email+"'"
  db.query(qry14, (err, result) => {
    console.log(qry14);
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        UserValidation: true,
      });
    else {
      res.send({
        UserValidation: false,
      });
    }
  });
});
//select user profile


app.get("/UserProfile/:id", (req, res) => {
  let id = req.params.id;
  let qry14 = "select * from tbl_user where user_id=" + id;
  db.query(qry14, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        UserProfile: result,
      });
    else {
      res.send({
        UserProfile: [],
      });
    }
  });
});
//select user

app.get("/UserSelect", (req, res) => {
  let qry14 = "select * from tbl_user where user_status='1";
  db.query(qry14, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        user: result,
      });
    else {
      res.send({
        user: [],
      });
    }
  });
});

//ward user select

app.get("/UserWardSel/:wid", (req, res) => {
  let wid = req.params.wid;

  let qry14 = "select * from tbl_user u inner join tbl_ward w on u.ward_id=w.ward_id where w.ward_id=" + wid + " and u.user_status='1'";
  console.log(qry14);
  db.query(qry14, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        UserWardSel: result,
      });
    else {
      res.send({
        UserWardSel: [],
      });
    }
  });
});
//electionagent insert

app.post("/Electionagent", upload.single("electionagent_photo"), (req, res) => {
  var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;

  let qry8 =
    "insert into tbl_electionagent(electionagent_name,electionagent_address,electionagent_place,electionagent_email,electionagent_password,electionagent_voteridno,electionagent_employementidno,electionagent_adharcardno,electionagent_photo,electionagent_gender,district_id,electionagent_doj) values('" +
    req.body.electionagent_name +
    "','" +
    req.body.electionagent_address +
    "','" +
    req.body.electionagent_place +
    "','" +
    req.body.electionagent_email +
    "','" +
    req.body.electionagent_password +
    "','" +
    req.body.electionagent_voteridno +
    "','" +
    req.body.electionagent_employementidno +
    "','" +
    req.body.electionagent_adharcardno +
    "','" +
    imgsrc +
    "','" +
    req.body.electionagent_gender +
    "','" +
    req.body.district_id +
    "',curdate())";

  db.query(qry8, (err, result) => {
    if (err) {
      console.log("error");
    } else {
      res.send({
        electionagent: "Data Saved",
      });
    }
  });
});

//electionagentselect

app.get("/Electionagentselect", (req, res) => {
  let qry15 = "select * from tbl_electionagent";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Electionagentselect: result,
      });
    else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

//electionagentprofile

app.get("/Electionagentprofile/:id", (req, res) => {
  let id = req.params.id;
  let qry15 = "select * from tbl_electionagent where electionagent_id=" + id;
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Electionagentprofile: result,
      });
    else {
      res.send({
        Electionagentprofile: [],
      });
    }
  });
});


//edit user profile

app.post("/ElectionAgentEdit/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "update tbl_electionagent set electionagent_name ='"+req.body.electionagent_name+"', electionagent_email ='"+req.body.electionagent_email+"', electionagent_address ='"+req.body.electionagent_address+"' where electionagent_id=" + id;
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "updated",
      });
    }
  });
});

//edit password user profile
app.post("/ElectionAgentPass/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "update tbl_electionagent set electionagent_password ='"+req.body.electionagent_password+"' where electionagent_id=" + id;
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "updated",
      });
    }
  });
});



//electionagentassign

app.get("/Assignselect/:id/", (req, res) => {
  const sid = req.params.id;

  let qry15 =
    "select * from tbl_electionagent where electionagent_id='" + sid + "'";

  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        Assignselect: result,
      });
    }
  });
});

app.get("/Condition_ward/:id", (req, res) => {
  const sid = req.params.id;

  let qry15 = "select * from tbl_ward where sectionsubport_id='" + sid + "'";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        Condition_ward: result,
      });
    }
  });
});

//insert election

app.post("/Election", (req, res) => {
  let qry9 =
    "insert into tbl_election (election_date,election_fordate,election_details) values(curdate(),'" +
    req.body.election_fordate +
    "','" +
    req.body.election_details +
    "')";
  db.query(qry9, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

//delete election

app.delete("/Election/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "delete from tbl_election where election_id='" + id + "' ";
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});

//select election

app.get("/Election", (req, res) => {
  let qry14 = "select * from tbl_election";
  db.query(qry14, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        election: result,
      });
    else {
      res.send({
        election: [],
      });
    }
  });
});


app.get("/ElectionSelect/:id", (req, res) => {
  let id = req.params.id;
  let qry14 = "select * from tbl_election e inner join tbl_assignagent a on e.election_id=a.election_id inner join tbl_electionagent ea on a.electionagent_id=ea.electionagent_id inner join tbl_ward w on a.ward_id=w.ward_id inner join tbl_user u on w.ward_id=u.ward_id where u.user_id=" + id;

  db.query(qry14, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        ElectionSelect: result,
      });
    else {
      res.send({
        ElectionSelect: [],
      });
    }
  });
});



//Vote  Accept

app.post("/VoteAccept/:uid", (req, res) => {
  let id = req.params.uid;

  let qry16 = "update tbl_polling set polling_status = '1' where user_id=" + id;
  console.log(qry16);
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Accepted",
      });
    }
  });
});

//user reject

app.post("/VoteReject/:uid", (req, res) => {
  let id = req.params.uid;

  let qry16 = "update tbl_polling set polling_status = '2' where user_id=" + id;
  console.log(qry16);
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Rejected",
      });
    }
  });
});




//result publish

app.post("/pollupdate", (req, res) => {
  let id = req.params.uid;

  let qry16 = "update tbl_polling set polling_status = '2' where polling_status= '1' ";
  console.log(qry16);
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "updated",
      });
    }
  });
});

//insert Canditate
app.post("/Candidate", (req, res) => {
  let qry23 = "select * from tbl_candidate where user_id=" + req.body.user_id
  db.query(qry23, (err, result) => {
    if (result.length > 0) {
      res.send({
        message: "You already a Candidate",
      });
    }
    else {
      let qry10 =
        "insert into tbl_candidate(user_id,election_id,submission_date,ward_id) values('" +
        req.body.user_id +
        "','" +
        req.body.election_id +
        "',curdate(),'" +
        req.body.ward_id +
        "')";
      db.query(qry10, (err, result) => {
        if (err) {
          console.log("error");
        } else {
          res.send({
            message: "",

          });
        }
      });
    }



  });

});


app.get("/CandidateCheck/:id", (req, res) => {
  let id = req.params.id;
  let qry14 = "select * from tbl_candidate c inner join tbl_ward w on c.ward_id=w.ward_id inner join tbl_assignagent a on w.ward_id=a.ward_id inner join tbl_user u on c.user_id=u.user_id where a.electionagent_id ="+id+ " and c.candidate_status=1"
  
  db.query(qry14, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        CandidateCheck: result,
      });
    else {
      res.send({
        CandidateCheck: [],
      });
    }
  });
});


//Candidate  Accept

app.post("/CandidateAccept/:uid", (req, res) => {
  let id = req.params.uid;

  let qry16 = "update tbl_candidate set candidate_status = '2' where user_id=" + id;
  console.log(qry16);
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Accepted",
      });
    }
  });
});

//Candidate reject

app.post("/CandidateReject/:uid", (req, res) => {
  let id = req.params.uid;

  let qry16 = "update tbl_candidate set candidate_status = '3' where user_id=" + id;
  console.log(qry16);
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Rejected",
      });
    }
  });
});


//Candidate  payment

app.post("/CandidatePayment/:uid", (req, res) => {
  let id = req.params.uid;

  let qry16 = "update tbl_candidate set candidate_status = '1' where user_id=" + id;
  console.log(qry16);
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "paided",
      });
    }
  });
});


app.post("/Assignagent", (req, res) => {
  let qry11 =
    "insert into tbl_assignagent(assignagent_date,election_id,ward_id,electionagent_id) values(curdate(),'" +
    req.body.election_id +
    "','" +
    req.body.ward_id +
    "','" +
    req.body.electionagent_id +
    "')";
  db.query(qry11, (err, result) => {
    if (err) {
      console.log("error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});






app.post("/Like", (req, res) => {
  let qry12 =
    "insert into tbl_like(user_id,campaign_id) values('" +
    req.body.user_id +
    "','" +
    req.body.campaign_id +
    "')";
  db.query(qry12, (err, result) => {
    if (err) {
      console.log("error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

//count LIke
app.get("/CountLike/:id", (req, res) => {
  let id = req.params.id
  let qry14 = "SELECT COUNT(like_id) AS numLike FROM tbl_like WHERE campaign_id=" + id
  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        CountLike: result,
      });
    else {
      res.send({
        CountLike: [],
      });
    }
  });
});


app.get("/Like/:id/:cid", (req, res) => {
  let id = req.params.id
  let cid = req.params.cid
  let qry15 = "select * from tbl_like where  user_id=" + id+" and campaign_id="+cid
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Like: true,
      });
    else {
      res.send({
        Like: false,
      });
    }
  });
});



//Like delete

app.delete("/LikeDelete/:id/:cid", (req, res) => {
  let id = req.params.id;
  let cid = req.params.cid;
  let qry16 = "delete from tbl_like where user_id=" + id+" and  campaign_id="+cid
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});

app.post("/Comment", (req, res) => {
  let qry12 =
    "insert into tbl_comment(comment_datetime,user_id,campaign_id,comment_content) values(DATE_FORMAT(sysdate(),'%m %d %y, %h:%i %p'),'" +
    req.body.user_id +
    "','" +
    req.body.campaign_id +
    "','" +
    req.body.comment_content +
    "')";
  db.query(qry12, (err, result) => {
    if (err) {
      console.log("error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

//select comment
app.get("/Comment/:id", (req, res) => {
  let id = req.params.id
  let qry14 = "SELECT * FROM tbl_comment c inner join tbl_user u on c.user_id=u.user_id WHERE c.campaign_id=" + id 
  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
   {
    result.map((dat, key) => {
      let qry18 = "SELECT comment_datetime,CASE  WHEN TIMESTAMPDIFF(SECOND, STR_TO_DATE(comment_datetime, '%m %d %y, %h:%i %p'), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, STR_TO_DATE(comment_datetime, '%m %d %y, %h:%i %p'), NOW()), ' seconds ago')  WHEN TIMESTAMPDIFF(MINUTE, STR_TO_DATE(comment_datetime, '%m %d %y, %h:%i %p'), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, STR_TO_DATE(comment_datetime, '%m %d %y, %h:%i %p'), NOW()), ' minutes ago') WHEN TIMESTAMPDIFF(HOUR, STR_TO_DATE(comment_datetime, '%m %d %y, %h:%i %p'), NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, STR_TO_DATE(comment_datetime, '%m %d %y, %h:%i %p'), NOW()), ' hours ago') WHEN TIMESTAMPDIFF(DAY, STR_TO_DATE(comment_datetime, '%m %d %y, %h:%i %p'), NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(DAY, STR_TO_DATE(comment_datetime, '%m %d %y, %h:%i %p'), NOW()), ' days ago') ELSE DATE(comment_datetime) END AS time_elapsed FROM tbl_comment where comment_id="+ dat.comment_id+" ORDER BY comment_datetime ASC" 
      db.query(qry18, (err, result2) => {
        result[key].time = result2;
        if (key === result.length - 1) {
          res.send({
            Comment: result,
          });
        }
      });
    })
   }
    else {
      res.send({
        Comment: [],
      });
    }
  });
});


//comment count

app.get("/CommentCount/:id", (req, res) => {
  let id = req.params.id
  let qry14 = "SELECT COUNT(comment_id) AS numComment FROM tbl_comment WHERE campaign_id=" + id
  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        CommentCount: result,
      });
    else {
      res.send({
        CommentCount: [],
      });
    }
  });
});



//comment delete

app.delete("/CommentDelete/:cid", (req, res) => {
  let cid = req.params.cid;
  let qry16 = "delete from tbl_comment where  comment_id="+cid
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});


app.post("/Polling", (req, res) => {
  let qry12 =
    "insert into tbl_polling(polling_datetime,user_id,candidite_id) values(DATE_FORMAT(sysdate(),'%m %d %y, %h:%i %p') ,'" + req.body.user_id +
    "','" +
    req.body.candidate_id +
    "')";
  db.query(qry12, (err, result) => {
    if (err) {
      console.log(qry12);
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

app.post("/Complaint", (req, res) => {
  let qry13 =
    "insert into tbl_complaint(complaint_date,complaint_content,user_id) values(DATE_FORMAT(sysdate(),'%m %d %y, %h:%i %p'),'" +
    req.body.complaint_content +
    "','" +
    req.body.user_id +
    "')";
  db.query(qry13, (err, result) => {
    if (err) {
      console.log("error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});




app.post("/Campaign", upload.single("camp_file"), (req, res) => {
  var fileimgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
  let qry16 =
    "insert into tbl_campaign(campaign_datetime,campaign_details,campaign_file,candidate_id) values(DATE_FORMAT(sysdate(),'%m %d %y, %h:%i %p'),'" +
    req.body.campaign_details +
    "','" +
    fileimgsrc +
    "','" +
    req.body.candidate_id +
    "')";
  db.query(qry16, (err, result) => {
    if (err) {
      console.log(qry16);
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});







app.get("/CampaignCan/:id", (req, res) => {
  let id = req.params.id
  let qry14 = "SELECT * FROM tbl_campaign c INNER JOIN tbl_candidate cd on c.candidate_id=cd.candidate_id INNER JOIN tbl_user u on cd.user_id=u.user_id WHERE cd.user_id=" + id + " ORDER BY c.campaign_id DESC"
  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
    result.map((dat, key) => {
      let qry18 = "SELECT campaign_datetime,CASE  WHEN TIMESTAMPDIFF(SECOND, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()), ' seconds ago')  WHEN TIMESTAMPDIFF(MINUTE, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()), ' minutes ago') WHEN TIMESTAMPDIFF(HOUR, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()), ' hours ago') WHEN TIMESTAMPDIFF(DAY, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(DAY, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()), ' days ago') ELSE DATE(campaign_datetime) END AS time_elapsed FROM tbl_campaign where campaign_id="+ dat.campaign_id+" ORDER BY campaign_datetime DESC" 
      db.query(qry18, (err, result2) => {
        result[key].time = result2;

        if (key === result.length - 1) {
          res.send({
            CampaignCan: result,
          });
        }
      });
    })
    else {
      res.send({
        CampaignCan: [],
      });
    }
  });
});


app.get("/Campaign/:id", (req, res) => {
  let id = req.params.id
  let qry14 = "SELECT * FROM tbl_campaign c INNER JOIN tbl_candidate cd on c.candidate_id=cd.candidate_id INNER JOIN tbl_user u on cd.user_id=u.user_id WHERE cd.candidate_status=2 and  cd.ward_id in(SELECT w.ward_id FROM tbl_ward w INNER JOIN tbl_candidate c on w.ward_id=c.ward_id INNER JOIN tbl_user us on us.ward_id=c.ward_id WHERE us.user_id=" + id + ")ORDER BY c.campaign_id DESC"
  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
    result.map((dat, key) => {
      let qry18 = "SELECT campaign_datetime,CASE  WHEN TIMESTAMPDIFF(SECOND, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()), ' seconds ago')  WHEN TIMESTAMPDIFF(MINUTE, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()), ' minutes ago') WHEN TIMESTAMPDIFF(HOUR, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()), ' hours ago') WHEN TIMESTAMPDIFF(DAY, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(DAY, STR_TO_DATE(campaign_datetime, '%m %d %y, %h:%i %p'), NOW()), ' days ago') ELSE DATE(campaign_datetime) END AS time_elapsed FROM tbl_campaign where campaign_id="+ dat.campaign_id+" ORDER BY campaign_datetime DESC" 
      db.query(qry18, (err, result2) => {
        result[key].time = result2;

        if (key === result.length - 1) {
          res.send({
            Campaign: result,
          });
        }
      });
    })
    else {
      res.send({
        Campaign: [],
      });
    }
  });
});


//delete campaingn

app.delete("/deletePost/:id", (req, res) => {
  let id = req.params.id;
  let qry16 = "delete from tbl_campaign where campaign_id='" + id + "' ";
  db.query(qry16, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});


app.post("/Feedback", (req, res) => {
  let qry14 =
    "insert into tbl_feedback(feedback_content,user_id) values('" +
    req.body.feedback_content +
    "','" +
    req.body.user_id +
    "')";
  db.query(qry14, (err, result) => {
    if (err) {
      console.log(qry14);
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

app.get("/Candidate", (req, res) => {
  let qry14 = "select * from tbl_candidate";
  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Candidate: result,
      });
    else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

app.get("/CandidateSelect/:id", (req, res) => {
  let id = req.params.id;
  let qry14 = "select * from tbl_user u  inner join tbl_candidate c  on c.user_id=u.user_id WHERE c.user_id=" + id;

  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        CandidateSelect: result,
      });
    else {
      res.send({
        CandidateSelect: [],
      });
    }
  });
});




app.get("/CandidateSel/:id", (req, res) => {
  let id = req.params.id;

  let qry14 = "SELECT * FROM tbl_candidate c INNER JOIN tbl_user u on  c.user_id=u.user_id  INNER JOIN tbl_ward w on c.ward_id=w.ward_id where candidate_status=2 and w.ward_id=(select ward_id from tbl_user where user_id= "+id+")"

  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        CandidateSel: result,
      });
    else {
      res.send({
        CandidateSel: [],
      });
    }
  });
});




app.get("/Result/:id", (req, res) => {
  let id = req.params.id;

  let qry14 = "SELECT * from tbl_candidate c inner join tbl_user u on u.user_id=c.user_id where c.ward_id = (select u.ward_id from tbl_ward w inner join tbl_user u on u.ward_id=w.ward_id where user_id= "+id +")"

  db.query(qry14, (err, result) => {
    console.log(qry14);

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
    {
      result.map((dat, key) => {
        let qry18 = "SELECT COUNT(polling_id) AS numVote FROM tbl_polling WHERE candidite_id=" + dat.candidate_id +" and polling_status=2"
        db.query(qry18, (err, result2) => {

          result[key].vote = result2[0].numVote;

          if (key === result.length - 1) {
            console.log(result[0]);
            res.send({
              Result: result,
            });
          }
        });
      })

    }
    else {
      res.send({
        Result: [],
      });
    }
  });
});



app.get("/CheckCandidate/:id", (req, res) => {
  let id = req.params.id;

  let qry14 = "select * from tbl_candidate where user_id=" + id +" and candidate_status= 2"
  db.query(qry14, (err, result) => {

    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        CheckCandidate: true,
        Cad_id: result[0].candidate_id,
      });
    else {
      res.send({
        CheckCandidate: false,
      });
    }
  });
});



app.get("/Assignagent", (req, res) => {
  let qry15 = "select * from tbl_assignagent";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Assignagent: result,
      });
    else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

app.get("/SelectAssign/:id", (req, res) => {
  let id = req.params.id;
  let qry15 = "SELECT * FROM tbl_assignagent a INNER JOIN tbl_election e on a.election_id=e.election_id INNER JOIN tbl_ward w on  a.ward_id=w.ward_id WHERE a.electionagent_id='" + id + "'";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        SelectAssign: result,
      });
    else {
      res.send({
        SelectAssign: [],
      });
    }
  });
});



app.get("/Comment", (req, res) => {
  let qry15 = "select * from tbl_comment";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Comment: result,
      });
    else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

app.get("/CheckVote/:id", (req, res) => {
  let id=req.params.id;
  let qry15 = "select * from tbl_polling where user_id="+id
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        CheckVote: true,
      });
    else {
      res.send({
        CheckVote: false,
      });
    }
  });
});


app.get("/CheckElection", (req, res) => {
  let qry15 = "select * from tbl_election "
  db.query(qry15, (err, result) => {
    console.log(qry15);
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        CheckElection: result,
      });
    else {
      res.send({
        CheckElection: [],
      });
    }
  });
});


app.get("/VerificationPolling/:wid/:eid", (req, res) => {
  let wid = req.params.wid;
  let eid = req.params.eid;
  let qry15 = "SELECT * FROM tbl_polling p INNER JOIN tbl_user u on p.user_id=u.user_id INNER JOIN tbl_assignagent a on a.ward_id=u.ward_id  WHERE a.ward_id=" + wid + " and a.election_id=" + eid;

  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        VerificationPolling: result,
      });
    else {
      res.send({
        VerificationPolling: [],
      });
    }
  });
});

app.get("/Complaint:/uid", (req, res) => {
  let num=req.params.uid
  let qry15 = "select * from tbl_complaint";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Complaint: result,
      });
    else {
      res.send({
        Complaint: [],
      });
    }
  });
});

app.get("/Feedback", (req, res) => {
  let qry15 = "select * from tbl_feedback";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Feedback: result,
      });
    else {
      res.send({
        Feedback: [],
      });
    }
  });
});

app.get("/Campaign", (req, res) => {
  let qry15 =
    "select * from tbl_campaign c inner join tbl_candidate t on c.candidate_id=t.candidate_id";
  db.query(qry15, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0)
      res.send({
        Campaign: result,
      });
    else {
      res.send({
        Campaign: [],
      });
    }
  });
});

app.post("/Candidate/:id", (req, res) => {
  let id = req.params.id;
  let qry17 =
    "update tbl_candidate set candidate_status='" +
    req.body.candidate_status +
    "' where candidate_id='" +
    id +
    "'";
  db.query(qry17, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: qry17,
      });
    }
  });
});

app.post("/Complaint/:id", (req, res) => {
  let id = req.params.id;
  let qry18 =
    "update tbl_complaint set complaint_status='" +
    req.body.complaint_status +
    "' where complaint_id='" +
    id +
    "'";
  db.query(qry18, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: qry18,
      });
    }
  });
});

app.post("/login", (req, res) => {
  let sel20 = "select * from tbl_admin where admin_email='" + req.body.email + "' and admin_password='" + req.body.password + "'";
  let sel23 = "select * from tbl_user where user_email='" + req.body.email + "' and user_password='" + req.body.password + "' and user_status in (1,2)";
  let sel22 = "select * from tbl_electionagent where electionagent_email='" + req.body.email + "' and electionagent_password='" + req.body.password + "'";
  db.query(sel20, (err, result) => {

    if (err) {
      console.log("Error");
    }
    else if (result.length > 0) {
      res.send({
        message: "Login Successful",
        id: result[0].admin_id,
        login: "admin"
      })
    }
  })
  db.query(sel22, (err, result) => {

    if (err) {
      console.log("Error");
    }
    else if (result.length > 0) {
      res.send({
        message: "Login Successful",
        id: result[0].electionagent_id,
        login: "electionagent"
      })
    }
  })
  db.query(sel23, (err, result) => {

    if (err) {
      console.log("Error");
    }
    else if (result.length > 0) {
      res.send({
        message: "Login Successful",
        id: result[0].user_id,
        login: "user"
      });
    }
    else {
      res.end()

    }
  })
})

app.get("/Admin", (req, res) => {
  let sel24 = "select * from tbl_admin where admin_id='" + req.body.id + "'";
  db.query(sel24, (err, result) => {
    if (err) {
      console.log("error");
    }
    else {
      res.send({
        admin: result,
      })

    }
  })
})

var express = require('express');
var router = express.Router();
const mysql = require("mysql");
const moment = require('moment');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'VimleshKumar@123';
const cors = require("cors");
// router.use(cors)
// router.use(express.json());
const fs = require("fs"); //Load the filesystem module
var serveStatic = require("serve-static");

// router.use('/pbns/dmam/LMedia', serveStatic('X:\\'));
// router.use('/pbns/dmam/Media', serveStatic('W:\\'));
const rootPath = 'c:/inetpub/wwwroot/pbns/dmam/';
router.use('/pbns/dmam/LMedia', serveStatic(rootPath + '/Lmedia'));
router.use('/pbns/dmam/Media', serveStatic(rootPath + '/Media'));


// pbns/dmam/Media/HouseFormat
// const filename = "x:/th1/TSD01_2021OCT13_070335_th1.jpg";
// function getFilesizeInBytes(filename) {
//   const stats = fs.statSync(filename);
//   const fileSizeInBytes = (stats.size / 1000).toFixed(0) + ' KB';
//   return fileSizeInBytes;
// }
// console.log(getFilesizeInBytes(filename))
// router.get('/getfilesize', function (req, res, next) {
//   // console.log(req.query.filename);
//   res.send(getFilesizeInBytes('y:/th1/' + req.query.filename));
// });

router.use('/login', (req, res) => {
  const sqlquery = `SELECT * FROM users where UserName='${req.body.userName}'`;
  const db = getdb();
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      bcrypt.compare(req.body.passWord, result[0].Pwd.replace(/^\$2y(.+)$/i, '$2a$1')).then((result1) => {
        if (result1) {
          // var token = jwt.sign({ UserName: result[0].UserName, FullName: result[0].FullName,ViewCode:result[0].ViewCode }, secret);
          var token = jwt.sign({ userInfo: result[0] }, secret);
          res.send({
            token: token// result[0]?.Token
          });
        }
        else {
          console.log(`UserName/Password didn't match`)
          res.send({
            token: `UserName/Password didn't match`// result[0]?.Token
          });
        }
      })
    }
    else {
      console.log('User not Found')
      res.send({
        token: `User not Found`
      });
    }
  });
  db.end();
});

router.use(async (req, res, next) => {
  if (req.headers["authorization"]) {
    const accessToken = req.headers["authorization"];
    jwt.verify(accessToken, secret, (err, decoded) => {
      if (err) {
        console.log('not verified');
        return res.status(401).json({
          error: "Not verified"
        });
      }
      if (decoded) {
        console.log(decoded.userInfo.UserName);
      }
    })

    next()
  } else {
    console.log("Not Authorised")
    return res.status(401).json({
      error: "Not Authorised"
    });
  }
});
/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(req.url);
  res.render('index', { title: 'Express' });
});
function getdb() {
  const db = mysql.createConnection({
    user: "itmaint",
    host: "localhost",
    password: "itddkchn",
    // database: "ndms030321",
    // database: "ndms",
    database: "dmam",
  });
  return db;
}

router.get("/getCueSheets", (req, res) => {
  const db = getdb();
  db.query("SELECT * from cuesheetsetting", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  db.end();
});

router.put("/insertInCueSheet", (req, res) => {
  const sqlquery = `INSERT INTO cuesheet (pgmID, cueID, UserID, Programname,filename, myDate,INpoint, OUTpoint,Duration,Remarks,fromreading,toreading,hiresfilename,islive,HiResFileTransfer,myCuedate,slot) 
  VALUES ('${req.body.pgmID}', '${req.body.cueID}', '${req.body.UserID}', '${req.body.Programname}','${req.body.filename}', '${req.body.myDate}', '${req.body.INpoint}', '${req.body.OUTpoint}', '${req.body.Duration}', '${req.body.Remarks}', '${req.body.fromreading}', '${req.body.toreading}', '${req.body.hiresfilename}', '${req.body.islive}' ,'${req.body.HiResFileTransfer}','${req.body.myCuedate}','${req.body.slot}')`
  const db = getdb();
  // console.log(Story);
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }
  );
  db.end();
});

router.get("/getmedia", (req, res) => {
  // const sqlquery = `SELECT *, media.Remarks as mediaRemarks from ((media inner join technicaldata on media.MediaID=technicaldata.MediaID) inner join metadata on media.MediaID=metadata.MediaID)  order by MediaUploadedTime DESC`;
  const sqlquery = `SELECT *, media.Remarks as mediaRemarks from (((media inner join technicaldata on media.MediaID=technicaldata.MediaID) inner join metadata on media.MediaID=metadata.MediaID)inner join upload on substring(media.MediaID,1,LENGTH(media.MediaID)-4)=upload.ProgID) where ALLReady=1 order by MediaUploadedTime DESC`;
  // const sqlquery =`SELECT *, media.Remarks as mediaRemarks from (((media inner join technicaldata on media.MediaID=technicaldata.MediaID) inner join metadata on media.MediaID=metadata.MediaID)inner join upload on substring(media.MediaID,1,22)=upload.ProgID) where ALLReady=1 order by MediaUploadedTime DESC`;

  const db = getdb();
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.length)
      res.send(result);
    }
  });
  db.end();
});

router.get("/getmedia2", (req, res) => {
  // const sqlquery = `SELECT MediaID, StateID,UserID,UNITID,FILENAMEASUPLOADED ,TitleEpisodePart,MediaNature,MediaType,MediaExt,UploadStatus,PATHHIGHRES,PATHLOWRES,STORAGEID_HIGHRES,STORAGEID_LOWRES,AllReady,FilenameProxy1,FilenameProxy2,ThumbnailBig,ThumbnailSmall,HouseFormat,MediaUploadedTime, LastUpdateTime,ContentVerifyStatus,ContentVerifiedBy,ContentVerifiedTime,TechnicalCheckStatus,TechnicalCheckBy,TechnicalCheckTime,Remarks,Favourite,Deleted from media order by LastUpdateTime`;
  const sqlquery = `SELECT * from media order by LastUpdateTime`;

  const db = getdb();
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  db.end();
});

router.get("/getusers", (req, res) => {
  const db = getdb();
  db.query("SELECT * from users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  db.end();
});
router.get("/getstates", (req, res) => {
  const db = getdb();
  db.query("SELECT * from states", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  db.end();
});


router.get("/getAllPrimaryCategory", (req, res) => {
  const db = getdb();
  db.query("SELECT * FROM primarycat", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  db.end();
});

router.get("/getAllSecondaryCategory", (req, res) => {
  const db = getdb();
  db.query("SELECT * FROM secondarycat", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  db.end();
});

router.get("/getLanguageList", (req, res) => {
  const db = getdb();
  db.query("SELECT * FROM languages", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  db.end();
});

router.put("/update", (req, res) => {
  const db = getdb();
  // console.log(Story);
  db.query(
    `UPDATE metadata SET ORIGTAPENUM ='${req.body.ORIGTAPENUM}',Cast_Artists ='${req.body.Cast_Artists}',Language ='${req.body.Language}',Producer ='${req.body.Producer}',AgencyName ='${req.body.AgencyName}',OfficerName ='${req.body.OfficerName}',Remarks ='${req.body.Remarks}',Synopsis ='${req.body.Synopsis}',Gradation ='${req.body.Gradation}',ProgSet ='${req.body.ProgSet}',Music ='${req.body.Music}',  Translation ='${req.body.Translation}'   WHERE MediaID ='${req.body.MediaID}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  db.end();
});


router.put("/updateMediadata", (req, res) => {
  const db = getdb();
  // console.log(req.body.Remarks);
  db.query(
    `UPDATE media SET Remarks ='${req.body.mediaRemarks}',Favourite ='${req.body.Favourite}',  Deleted ='${req.body.Deleted}'   WHERE MediaID ='${req.body.MediaID}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  db.end();
});

router.put("/updateAccessRights", (req, res) => {
  const db = getdb();
  db.query(
    `UPDATE media SET AccessRights ='${req.body.AccessRights}' WHERE MediaID ='${req.body.MediaID}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  db.end();
});

router.put("/updateMediaNature", (req, res) => {
  const db = getdb();
  db.query(
    `UPDATE media SET MediaNature ='${req.body.MediaNature}' WHERE MediaID ='${req.body.MediaID}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  db.end();
});

router.put("/updateTCOK", (req, res) => {
  const db = getdb();
  db.query(
    `UPDATE media SET TechnicalCheckStatus ='${req.body.TechnicalCheckStatus}' ,  TechnicalCheckBy='${req.body.TechnicalCheckBy}' , TechnicalCheckTime='${moment(new Date().toISOString()).format("yyyy-MM-DDTHH:mm:ss")}'  WHERE MediaID ='${req.body.MediaID}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  db.end();
});

router.put("/updateContentOK", (req, res) => {
  const db = getdb();
  db.query(
    `UPDATE media SET ContentVerifyStatus ='${req.body.ContentVerifyStatus}' ,  ContentVerifiedBy='${req.body.ContentVerifiedBy}' , ContentVerifiedTime='${moment(new Date().toISOString()).format("yyyy-MM-DDTHH:mm:ss")}'  WHERE MediaID ='${req.body.MediaID}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  db.end();
});

router.put("/updateFavourite", (req, res) => {
  const db = getdb();
  db.query(
    `UPDATE media SET Favourite ='${req.body.Favourite}' WHERE MediaID ='${req.body.MediaID}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  db.end();
});

router.delete("/delete/:id", (req, res) => {
  const db = getdb();
  const id = req.params.id;
  db.query("DELETE FROM mdeia WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  db.end();
});


module.exports = router;

import express, { json } from "express";
import cors from "cors";
import * as sql from "@cityssm/mssql-multi-pool";
import dayjs from "dayjs";
import bodyParser from "body-parser";
import * as nodemailer from "nodemailer";

const app = express();

app.use(json());
app.use(cors());

// const sqlConfig = {
//   user: "PG-WebTest",
//   password: "WebTest!15",
//   database: "PG-CSE-Tish",
//   server: "sql.property-genie.com",
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
//   options: {
//     trustServerCertificate: true, // change to true for local dev / self-signed certs
//   },
// };

// server=sql.property-genie.com;uid=pgUser;pwd=LicSvrPG;database=PropertyGenie

const ccConfig = {
  user: "pgUser",
  password: "LicSvrPG",
  database: "PropertyGenie",
  server: "sql.property-genie.com",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const contactEmail = {
  //this is the authentication for sending email.
  host: "mailer.synsoftllc.com",
  port: 587,
  secure: true, // use TLS
  auth: {
    user: "mailer",
    pass: "DbE4FjX97uZ5W@3Q",
  },
};

const transporter = nodemailer.createTransport(contactEmail);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.use("/contact", (req, res) => {
  const options = {
    from: req.body.fromEmail,
    to: req.body.toEmail, //figure out actual destination
    subject: "Requesting More Info",
    body: req.body.body,
  }
  transporter.sendMail(options)
});

const determineSQLCredentials = (url) => {
  // console.log("req.hostname", req.hostname);
  //switch statement based on url
  //const url = req.body.url.includes("localhost") ? "tish.property-genie.com" : req.body.url;
  if (url.includes("douglas.property-genie.com")) {
    return {
      user: "PG-DouglasNewUser",
      password: "pgd0ug1@su$er@123",
      database: "PG-Douglas2011",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("realestatedirect.property-genie.com")) {
    return {
      user: "red-sa",
      password: "red123",
      database: "realestatedirect",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("remaxtrinity.property-genie.com")) {
    return {
      user: "PG-TrinityUser",
      password: "PG-Trinity@123",
      database: "PG-RemaxTrinity",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("alfonsopmjacksoncounty.property-genie.com")) {
    return {
      user: "PG-Alfonso-JacksonCountyUser",
      password: "alfonsopmjackson@123",
      database: "PG-Alfonso-JacksonCounty",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("archercrown.property-genie.com")) {
    return {
      user: "ArcherCrownUser",
      password: "pgarchcrown@123",
      database: "PG-Douglas2011",
      server: "PG-ArcherCrown",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("christineweberrealty.property-genie.com")) {
    return {
      user: "PG-ChristineWeber2011User",
      password: "pgchr1st1n3w3ber@123",
      database: "PG-ChristineWeber2011",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("acgc.property-genie.com")) {
    return {
      user: "PG-ACGCUser",
      password: "pgacgc@123",
      database: "PG-ACGC",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("flgulfside.property-genie.com")) {
    return {
      user: "PG-FLGSMUser",
      password: "pgflgsm@123",
      database: "PG-FLGulfside",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("century21desertestates.property-genie.com")) {
    return {
      user: "PG-C21-DesertEstatesUser",
      password: "c21d3sertestates@123",
      database: "PG-C21-DesertEstates",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("paradiserealestate.property-genie.com")) {
    return {
      user: "PG-ParadiseRealEstateUser",
      password: "pgp@rad1s3@123",
      database: "PG-ParadiseRealEstate",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("eaglerealtygroup.property-genie.com")) {
    return {
      user: "PG-EagleRealtyGroupUser",
      password: "EagleRealtyGroup!12",
      database: "PG-EagleRealtyGroup",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("alfonsodiamondheadold.property-genie.com")) {
    return {
      user: "PG-Alfonso-DiamondHeadUser",
      password: "PG-Alfonso-DiamondHead@123",
      database: "PG-Alfonso-DiamondHead",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("corporatehousingsolutions.property-genie.com")) {
    return {
      user: "PG-CorpHSUser",
      password: "pgcorphs@123",
      database: "PG-CorporateHousingSolutions",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("alfonsorealty.property-genie.com")) {
    return {
      user: "PG-Alf",
      password: "alfuser@123",
      database: "PG-AlfonsoRealty",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("alfonsoOceanSprings.property-genie.com")) {
    return {
      user: "PG-Alfonso-OceanSprings2013User",
      password: "Alfonso-OceanSprings!13",
      database: "PG-Alfonso-OceanSprings2013",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("RemaxRealEstatePartners.property-genie.com")) {
    return {
      user: "PG-RemaxRealEstatePartnersUser",
      password: "RemaxRealEstate!13",
      database: "PG-RemaxRealEstatePartners",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("collmanproperties.property-genie.com")) {
    return {
      user: "PG-CollmanProperties",
      password: "collmanproperties!15",
      database: "PG-CollmanProperties",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("remaxcoastdelta.property-genie.com")) {
    return {
      user: "PG-Remax-CoastDelta",
      password: "remaxcoastdelta!16",
      database: "PG-Remax-CoastDelta",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("m3propertiesllc.property-genie.com")) {
    return {
      user: "PG-m3propertiesllc",
      password: "m3propertiesllc!17",
      database: "PG-m3propertiesllc",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("mitchellbuchalterllc.property-genie.com")) {
    return {
      user: "PG-MitchellBuchalterllc",
      password: "mitchellbuchalterllc!17",
      database: "PG-MitchellBuchalterllc",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("orlandoexpertrealty.property-genie.com")) {
    return {
      user: "PG-orlandoexpertrealty",
      password: "orlandoexpertrealty!17",
      database: "PG-orlandoexpertrealty",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("mitchellinvestmentsllp.property-genie.com")) {
    return {
      user: "PG-mitchellinvestmentsllp",
      password: "mitchinvestllp!17",
      database: "PG-mitchellinvestmentsllp",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("alfonsodiamondhead.property-genie.com")) {
    return {
      user: "PG-Alfonso-DiamondHeadUser",
      password: "PG-Alfonso-DiamondHead@123",
      database: "PG-Alfonso-DiamondHead-DH",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("ddjonesholdings.property-genie.com")) {
    return {
      user: "PG-DDJonesHoldings",
      password: "ddjonesholdings!21",
      database: "PG-DDJonesHoldings",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("oir.property-genie.com")) {
    return {
      user: "PG-OrlandoInlandUser",
      password: "Orl@ndoInl@nd",
      database: "PG-OIR",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("securedoorpm.property-genie.com")) {
    return {
      user: "PG-SecureDoorpm",
      password: "securedoorpm!23",
      database: "PG-securedoorpm",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("renthomefl.com")) {
    return {
      user: "RHM_PG",
      password: "rhm@123",
      database: "RHM_PG",
      server: "remote.renthomefl.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("dana.property-genie.com")) {
    return {
      user: "PG-WebTest",
      password: "WebTest!15",
      database: "PG-CSE-Dana",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("tish.property-genie.com")) {
    return {
      user: "PG-WebTest",
      password: "WebTest!15",
      database: "PG-CSE-Tish",
      server: "sql.synsoftllc.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else if (url.includes("demo.property-genie.com")) {
    return {
      user: "PG-Demo",
      password: "Password123!456",
      database: "PG-Demo",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  } else {
    return {
      user: "PG-WebTest",
      password: "WebTest!15",
      database: "PG-CSE-Tish",
      server: "sql.property-genie.com",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  }
};

app.use("/ownerLogin", (req, res) => {
  console.log("ownerLogin");
  const username = req.body.username;
  const password = req.body.password;
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);

  if (username !== null && password !== null) {
    try {
      sql.connect(sqlConfig).then((conn) => {
        conn
          .query(
            "SELECT * FROM tblOwner where Owner_email = '" +
              username +
              "' AND Owner_Password = '" +
              password +
              "'"
          )
          .then((dbData) => {
            console.log("dbData", dbData);
            console.log("dbData.recordset", dbData.output);
            if (dbData === null || dbData.length === null) {
              return;
            }
            res.send(dbData);
          })
          .then(() => conn.close());
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send({ message: "Wrong username or password" });
  }
});

app.use("/tenantLogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);

  if (username !== null && password !== null) {
    try {
      sql.connect(sqlConfig).then((conn) => {
        conn
          .query(
            "SELECT Prspct_ID,Prspct_FirstName,Prspct_LastName, PropTen_LeaseID as LeaseID, PropTen_Email,PropTen_ID " +
              "FROM tblProspect INNER " +
              "JOIN tblPropertyTenant ON Prspct_Id = PropTen_ProspectID INNER " +
              "JOIN tblPropertyLease ON PropTen_LeaseID = Lease_ID " +
              "WHERE (Lease_Status in ('Current','Dormant')) AND PropTen_Email = '" +
              username +
              "' " +
              "AND PropTen_Password = '" +
              password +
              "'"
          )
          .then((dbData) => {
            console.log("dbData in tenantLogin", dbData);
            res.send(dbData);
          })
          .then(() => conn.close());
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send({ message: "Wrong username or password" });
  }
});

app.use("/ownerProperties", (req, res) => {
  console.log("ownerProperties");
  const ownerID = req.body.ownerID;
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);

  if (ownerID !== null && ownerID !== undefined) {
    try {
      sql.connect(sqlConfig).then((conn) => {
        conn
          .query("select * from tblProperty WHERE Owner_ID = '" + ownerID + "'")
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          })
          .then(() => conn.close());
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("no ownerID");
  }
});

app.use("/ownerStatements", (req, res) => {
  console.log("ownerStatements");
  const ownerID = req.body.ownerID;
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);

  if (ownerID !== null && ownerID !== undefined) {
    try {
      sql.connect(sqlConfig).then((conn) => {
        conn
          .query(
            "select * from tblOwnerStatements where OS_OwnerID = '" +
              ownerID +
              "' AND OS_Uploaded = 'True' ORDER BY OS_StatementEndDate desc"
          )
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          })
          .then(() => conn.close());
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("no ownerID");
  }
});

app.use("/ownerPropertyJournal", (req, res) => {
  console.log("ownerPropertyJournal");
  const propertyID = req.body.propertyID;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);

  if (propertyID !== null && propertyID !== undefined) {
    try {
      sql.connect(sqlConfig).then((conn) => {
        conn
          .query(
            "EXEC sp_OwnerStatment @PropID='" +
              propertyID +
              "', @StartDate = '" +
              startDate +
              "', @EndDate = '" +
              endDate +
              "'"
          )
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          })
          .then(() => conn.close());
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("bad parameters");
  }
});

app.use("/tenantInfo", (req, res) => {
  const tenantId = req.body.tenantID;
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);
  if (tenantId !== null && tenantId !== undefined) {
    try {
      sql.connect(sqlConfig).then((conn) => {
        conn
          .query("select * from tblPropertyTenant where PropTen_ID = '" + tenantId + "'")
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          })
          .then(() => conn.close());
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("no tenantID");
  }
});

app.use("/tenantJournal", (req, res) => {
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);
  const LeaseID = 3;
  if (LeaseID !== null && LeaseID !== undefined) {
    try {
      sql.connect(sqlConfig).then((conn) => {
        conn
          .query(
            `SELECT ViewAccountingTransactions.Reference, ViewAccountingTransactions.[Transaction Date], 
          ViewAccountingTransactions.Type, ViewAccountingTransactions.Debit, ViewAccountingTransactions.Credit,
          ViewAccountingTransactions.TransID, ViewAccountingTransactions.LeaseID, 
          ViewAccountingTransactions.PropID, ViewAccountingTransactions.PostedOn, ViewAccountingTransactions.PostedBy, 
          ViewAccountingTransactions.WOID, ViewAccountingTransactions.Source, tblAcctgPayments.AcctPay_IsDeposit 
          FROM  ViewAccountingTransactions LEFT OUTER JOIN 
          tblAcctgPayments ON ViewAccountingTransactions.TransID = tblAcctgPayments.AcctPay_ID 
          WHERE (ViewAccountingTransactions.LeaseID = ${LeaseID}) AND (tblAcctgPayments.AcctPay_IsDeposit = 0) AND 
          (ViewAccountingTransactions.Reference <> 'Security Deposit Release') AND (ViewAccountingTransactions.Source = 'Payment')  OR 
          (ViewAccountingTransactions.LeaseID = ${LeaseID}) AND (tblAcctgPayments.AcctPay_IsDeposit IS NULL) AND 
          (ViewAccountingTransactions.Reference <> 'Security Deposit Release') AND (ViewAccountingTransactions.Source = 'Payment') OR 
          (ViewAccountingTransactions.LeaseID = ${LeaseID}) AND (ViewAccountingTransactions.Reference <> 'Security Deposit Release') AND 
          (ViewAccountingTransactions.Source <> 'Payment') 
          ORDER BY ViewAccountingTransactions.[Transaction Date]`
          )
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          })
          .then(() => conn.close());
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("no tenantID");
  }
});

app.use("/insertPayment", (req, res) => {
  const licenseID = req.licenseID;
  const userPwd = req.userPwd;
  const propID = req.propID;
  const ownerID = req.ownerID;
  const date = req.date;
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);

  if (licenseID != null && userPwd != null && propID != null && ownerID != null && date != null) {
    try {
      sql.connect(ccConfig).then(() => {
        const result = new sql.Request()
          .query(
            `INSERT INTO tblMerchant CHARGES (CC_LicenseID, CC_UserPassword, CC_PropID, CC_OwnerID, CC_Date) VALUES (${licenseID}, ${userPwd}, ${propID}, ${ownerID}, ${date}); SELECT SCOPE_IDENTITY()`
          )
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("bad parameters");
  }
});

app.use("/getLicense", (req, res) => {
  console.log("req.body.url", req.body.url);
  const url = req.body.url.includes("localhost") ? "tish.property-genie.com" : req.body.url;
  if (url != null) {
    try {
      sql.connect(ccConfig).then((conn) => {
        conn
          .query(`SELECT Lic_License from tblLicense where Lic_PGWebsite = '${url}'`)
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          })
          .then(() => conn.close());
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("bad parameters");
  }
});

app.use("/makePayment", (req, res) => {
  const license = req.body.licenseID;
  const userPwd = req.body.userPwd;
  const propID = req.body.propID;
  const isOwner = req.body.isOwner;
  const ownerID = isOwner ? req.body.ownerID : null;
  const tenantID = !isOwner ? req.body.tenantID : null;
  const date = dayjs().format("YYYY-MM-DD HH:mm:ss.SSS");

  console.log("req", req.body);

  try {
    if (ownerID != null) {
      sql.connect(ccConfig).then((conn) => {
        conn
          .query(
            "INSERT INTO tblMerchantCharges (CC_LicenseID, CC_UserPassword, CC_PropID, CC_OwnerID, CC_Date) " +
              "VALUES ('" +
              license +
              "', '" +
              userPwd +
              "', " +
              propID +
              ", " +
              ownerID +
              ", '" +
              date +
              "');" +
              " SELECT SCOPE_IDENTITY()"
          )
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          })
          .then(() => conn.close());
      });
    } else {
      sql.connect(ccConfig).then((conn) => {
        conn
          .query(
            "INSERT INTO tblMerchantCharges (CC_LicenseID, CC_UserPassword, CC_PropID, CC_TenantID, CC_Date) " +
              "VALUES ('" +
              license +
              "', '" +
              userPwd +
              "', " +
              propID +
              ", " +
              tenantID +
              ", '" +
              date +
              "');" +
              " SELECT SCOPE_IDENTITY()"
          )
          .then((dbData) => {
            if (dbData) {
              res.send(dbData);
            }
          })
          .then(() => conn.close());
      });
    }
  } catch (error) {
    console.log("error", error);
  }
});

app.use("/availableProperties", (req, res) => {
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);
  console.log("url", url);
  console.log("sqlConfig", sqlConfig);
  try {
    sql.connect(sqlConfig).then((conn) => {
      conn
        .query(
          "SELECT tblProperty.Property_Addr1, tblProperty.Property_Addr2, tblProp2Show.PropShow_RentAmt, tblProperty.Property_City, tblProperty.Property_Zip, " +
            "tblProperty.Property_Bedrooms, tblProperty.Property_Baths, tblProperty.Property_TotalSqFt, " +
            "tblProp2Show.PropShow_Description, tblProp2Show.PropShow_Active, " +
            "tblProperty.Property_ID, tblProperty.Property_ForSale, tblProperty.Property_ForSalePrice " +
            "FROM tblProperty INNER JOIN tblProp2Show ON tblProperty.Property_ID = tblProp2Show.PropShow_PropertyID " +
            "WHERE ((tblProperty.Property_Status <> 'Inactive') AND (tblProperty.Property_Status <> 'Dormant')) "
        )
        .then((dbData) => {
          if (dbData) {
            res.send(dbData);
          }
        })
        .then(() => conn.close());
    });
  } catch (err) {
    console.log(err);
  }
});

app.use("/propertyInfo", (req, res) => {
  const propID = req.body.propertyID;
  const url = req.body.url;
  const sqlConfig = determineSQLCredentials(url);

  try {
    sql.connect(sqlConfig).then((conn) => {
      conn
        .query(
          "SELECT tblProperty.Property_Addr1, isnull(tblProperty.Property_Addr2,'') as Property_Addr2, " +
            "tblProp2Show.PropShow_RentAmt, isnull(tblProperty.Property_City,'') as Property_City, " +
            "isnull(tblProperty.Property_State,'') as Property_State, isnull(tblProperty.Property_zip,'') as Property_zip, " +
            "tblProperty.Property_Bedrooms, tblProperty.Property_Baths, tblProperty.Property_TotalSqFt, " +
            "isnull(tblProp2Show.PropShow_Description,'') as PropShow_Description, " +
            "tblProp2Show.PropShow_Active, tblProperty.Property_ID, " +
            "isnull(tblProperty.Property_Subdivision,'') as Property_Subdivision, " +
            "tblProp2Show.PropShow_AvailDate, isnull(tblProperty.Property_Longitude,0) as Property_Longitude, " +
            "isnull(tblProperty.Property_Latitude,0) as Property_Latitude, " +
            "isnull(tblProperty.Property_Gated,0) as Property_Gated, isnull(tblProperty.Property_PetsAllowed,0) as Property_PetsAllowed, " +
            "isnull(tblProperty.Property_PoolCare,0) as Property_PoolCare, isnull(tblProperty.Property_LawnCare,0) as Property_LawnCare, " +
            "isnull(tblProperty.Property_ForSale,0) as Property_ForSale, isnull(tblProperty.Property_ForSalePrice,0) as Property_ForSalePrice, " +
            "isnull(tblPetPreferences.PetPref_Description,'') as PetPref_Description " +
            "FROM tblProperty INNER JOIN tblProp2Show ON tblProperty.Property_ID = tblProp2Show.PropShow_PropertyID " +
            "LEFT OUTER JOIN tblPetPreferences ON tblProperty.Property_PetPrefID = tblPetPreferences.PetPref_ID " +
            `WHERE tblProperty.Property_ID = ${propID}`
        )
        .then((dbData) => {
          if (dbData) {
            res.send(dbData);
          }
        })
        .then(() => conn.close());
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => console.log("API is running on http://localhost:8080/"));

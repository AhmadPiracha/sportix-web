const express = require("express");
const mysql = require("mysql2");
var app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(cors());
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const sql = require('mssql');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8001, () => {
  console.log("Server is listening on port 8001");
});
var connection = mysql.createConnection({
  host: "localhost",
  database: "sportix",
  user: "root",
  password: "password",
});

app.post("/AdminLogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM AdminLogin WHERE email = ? and password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          const user = result[0];
          const token = jwt.sign({ userId: user.id, email: user.email }, '123');
          res.send({ token });
        } else {
          res.send({ message: "WRONG NAME OR PASSWORD" });
        }
      }
    }
  );
});

app.post("/team", (req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const type = req.body.type;

  connection.query(
    "SELECT * FROM teams WHERE name = ?",
    [name],
    (err, result) => {
      if (err) {
        res.status(500).send("Database error");
      } else {
        if (result.length > 0) {
          res.send({ message: "Sports Team already Registerd" });
        } else {
          connection.query(
            "INSERT INTO teams (name, date, type) VALUES (?, ?, ?)",
            [name, date, type],
            (err, result) => {
              if (err) {
                res.status(500).send("Database error");
              } else {
                res.send(result);
              }
            }
          );
        }
      }
    }
  );
});

app.post("/addEquipment", (req, res) => {
  const Name = req.body.Name;
  const Type = req.body.Type;
  const Count = req.body.Count;
  const date = req.body.date;
  connection.query(
    "SELECT * FROM product WHERE  Name=? ",
    [Name],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "Sports Equipment already exist" });
        } else {
          connection.query(
            "INSERT INTO product (Type,Name,Count,date) VALUES(?,?,?,?)",
            [Type, Name, Count, date],
            (err, result) => {
              if (result) {
                res.send(result);
              } else {
                res.send("Enter CORRECT ASKED DETAILS");
              }
            }
          );
        }
      }
    }
  );
});

app.post("/addEquipmentLog", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const type = req.body.type;
  const count = req.body.count;
  const date = req.body.date;

  connection.query(
    "INSERT INTO EquipmentLog (id,type, name, count, date) VALUES (?,?, ?, ?, ?)",
    [id, type, name, count, date],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into EquipmentLog:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Data inserted into EquipmentLog:", result);
        res.send(result);
      }
    }
  );
});

app.post("/addLeague", (req, res) => {
  const Name = req.body.Name;
  const Type = req.body.Type;
  connection.query(
    "SELECT * FROM league WHERE  League_name=? ",
    [Name],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "already exist" });
        } else {
          connection.query(
            "INSERT INTO league (League_Name,League_Type) VALUES(?,?)",
            [Name, Type],
            (err, result) => {
              if (result) {
                res.send(result);
              } else {
                res.send("Enter CORRECT ASKED DETAILS");
              }
            }
          );
        }
      }
    }
  );
});
app.post("/LeagueTeams", (req, res) => {
  const L_name = req.body.L_name;
  const name = req.body.name;
  const Type = req.body.Type;
  connection.query(
    "SELECT * FROM LeagueTeams WHERE  name=? AND League_Name=?",
    [L_name, name],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "already exist" });
        } else {
          connection.query(
            "INSERT INTO LeagueTeams (name,League_Name,Type) VALUES(?,?,?)",
            [L_name, name, Type],
            (err, result) => {
              if (result) {
                res.send(result);
              } else {
                res.send("Enter CORRECT ASKED DETAILS");
              }
            }
          );
        }
      }
    }
  );
});
app.get("/getVenue/:id", (req, res) => {
  const venueId = req.params.id;

  connection.query(
    "SELECT * FROM venue WHERE id = ?",
    [venueId],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ message: "Internal server error" });
      } else if (rows.length > 0) {
        const venue = rows[0];
        res.json(venue);
      } else {
        res.status(404).json({ message: "Venue not found" });
      }
    }
  );
});

app.post("/addVenue", (req, res) => {
  const Name = req.body.Name;
  const Type = req.body.Type;
  const Location = req.body.Location;
  const date = req.body.date;
  connection.query(
    "SELECT * FROM venue WHERE  Name=?",
    [Name],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "Venue Already exist" });
        } else {
          connection.query(
            "INSERT INTO venue (Name,Type,Location,date) VALUES(?,?,?,?)",
            [Name, Type, Location, date],
            (err, result) => {
              if (result) {
                res.send(result);
              } else {
                res.send("Enter CORRECT ASKED DETAILS");
              }
            }
          );
        }
      }
    }
  );
});

app.post("/startBidding", (req, res) => {
  const league = req.body.league;
  const type = req.body.type;
  const date = req.body.date;
  const status = "Valid";
  connection.query(
    "SELECT * FROM bidding_cricket WHERE League_name=?",
    [league],
    (err, result) => {
      if (err) {
        res.status(500).send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "Bidding Already Started for this League" });
        } else {
          connection.query(
            "INSERT INTO bidding_cricket (League_name, type, status, date) VALUES (?, ?, ?, ?)",
            [league, type, status, date],
            (err, result) => {
              if (result) {
                res.send(result);
              } else {
                res.status(500).send("Enter CORRECT ASKED DETAILS");
              }
            }
          );
        }
      }
    }
  );
});

app.post("/stopBidding", (req, res) => {
  const league = req.body.league;
  const status = "Invalid";

  connection.query(
    "UPDATE bidding_cricket SET status=? WHERE League_name=?",
    [status, league],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/startBiddingFutsal", (req, res) => {
  const league = req.body.league;
  const type = req.body.type;
  const date = req.body.date;
  const status = "Valid";
  connection.query(
    "SELECT * FROM bidding_cricket WHERE League_name=?",
    [league],
    (err, result) => {
      if (err) {
        res.status(500).send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "Bidding Already Started for this League" });
        } else {
          connection.query(
            "INSERT INTO bidding_cricket (League_name, type, status, date) VALUES (?, ?, ?, ?)",
            [league, type, status, date],
            (err, result) => {
              if (result) {
                res.send(result);
              } else {
                res.status(500).send("Enter CORRECT ASKED DETAILS");
              }
            }
          );
        }
      }
    }
  );
});

app.post("/stopBiddingFutsal", (req, res) => {
  const league = req.body.league;
  const status = "Invalid";

  connection.query(
    "UPDATE bidding_cricket SET status=? WHERE League_name=?",
    [status, league],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/dummy", (req, res) => {
  const name = "Pending";
  connection.query("SELECT * FROM Player", (err, result) => {
    if (err) {
      req.setEncoding({ err: err });
    } else {
      if (result.length > 0) {
        connection.query(
          "INSERT INTO ddummy(name) VALUES(?)",
          [name],
          (err, result) => {
            if (result) {
              res.send(result);
            } else {
              res.send("Enter CORRECT ASKED DETAILS");
            }
          }
        );
      } else {
      }
    }
  });
});
app.post("/Regplayer", (req, res) => {
  const teamId = req.body.teamId;
  const playerName = req.body.playerName;
  const playerRollNo = req.body.playerRollNo;
  connection.query(
    "SELECT * FROM Player WHERE rollno = ?",
    [playerRollNo],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.length > 0) {
          res.status(409).json({ message: "Player already exists" });
        } else {
          connection.query(
            "INSERT INTO player (team, playername, rollno) VALUES (?, ?, ?)",
            [teamId, playerName, playerRollNo],
            (err, result) => {
              if (err) {
                res.status(500).json({ error: "Internal server error" });
              } else {
                res
                  .status(200)
                  .json({ message: "Player registered successfully" });
              }
            }
          );
        }
      }
    }
  );
});

app.get("/getTeams", function (req, res) {
  let sql = "SELECT * FROM teams WHERE type='Cricket'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getVenue", function (req, res) {
  let sql = "SELECT * FROM venue";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/getBadminton", function (req, res) {
  let sql = "SELECT * FROM teams WHERE type='Badminton'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getBasketball", function (req, res) {
  let sql = "SELECT * FROM teams WHERE type='Basketball'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getLeagueSchedule", function (req, res) {
  const LeagueName = req.query.Leaguename;
  let sql = "SELECT * FROM matches WHERE League_Name = ?";
  connection.query(sql, [LeagueName], function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getLeagueschedule", function (req, res) {
  const leagueName = req.query.leagueName;
  let sql = "SELECT * FROM matches WHERE League_Name = ?";

  connection.query(sql, [leagueName], function (err, results) {
    if (err) {
      res.status(500).json({ error: "An error occurred while fetching data." });
    } else {
      res.send(results);
    }
  });
});
app.get("/getLeagueSchedule", (req, res) => {
  const { Leaguename } = req.query;
  connection.query(
    "SELECT * FROM matches WHERE League_Name = ?",
    [Leaguename],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(result);
      }
    }
  );
});
app.post("/MatchData", (req, res) => {
  const { team1, team2, timeSlot, Leaguename, date } = req.body;
  connection.query(
    "SELECT * FROM matches WHERE team1 = ? AND team2=? And League_Name=? ",
    [team1, team2, timeSlot, Leaguename, date],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
        } else {
          connection.query(
            "INSERT INTO matches (team1, team2, slot,League_Name,Match_Date) VALUES (?, ?, ?,?,?)",
            [team1, team2, timeSlot, Leaguename, date],
            (err, result) => {
              if (result) {
                res.send(result);
              } else {
                res.send("Enter CORRECT ASKED DETAILS");
              }
            }
          );
        }
      }
    }
  );
});

app.get("/getFutsal", function (req, res) {
  let sql = "SELECT * FROM teams WHERE type='Futsal'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getVolly", function (req, res) {
  let sql = "SELECT * FROM teams WHERE type='Volleyball'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.put("/deleteTeam", (req, res) => {
  const id = req.body.id;
  connection.query("DELETE FROM teams WHERE id =?", [id], (err, result) => {
    if (err) {
      req.setEncoding({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Are You Sure You Want To Remove This User" });
      }
    }
  });
});
app.put("/deleteVenue", (req, res) => {
  const id = req.body.id;
  connection.query("DELETE FROM Venue WHERE id =?", [id], (err, result) => {
    if (err) {
      req.setEncoding({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
      }
    }
  });
});
app.put("/deletePlayer", (req, res) => {
  const name = req.body.name;
  connection.query(
    "DELETE FROM player WHERE team =?",
    [name],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        }
      }
    }
  );
});
app.put("/deleteMatchSchedule", (req, res) => {
  const Id = req.body.id;
  connection.query(
    "DELETE FROM teamschedule WHERE id =?",
    [Id],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        }
      }
    }
  );
});

app.put("/deleteEquipment", (req, res) => {
  const Id = req.body.id;
  connection.query("DELETE FROM product WHERE id =?", [Id], (err, result) => {
    if (err) {
      req.setEncoding({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      }
    }
  });
});

app.put("/Updatebooking", (req, res) => {
  const Id = req.body.id;
  connection.query(
    "UPDATE equip_booking SET status='Confirmed' WHERE id =?",
    [Id],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        }
      }
    }
  );
});
app.put("/UpdateProduct", (req, res) => {
  const name = req.body.name;
  const count = req.body.count;
  connection.query(
    "UPDATE product SET count=count-? WHERE name =?",
    [count, name],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        }
      }
    }
  );
});
app.put("/Updatebooking1", (req, res) => {
  const Id = req.body.id;

  connection.query(
    "UPDATE equip_booking SET status='Cancelled' WHERE id =?",
    [Id],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        }
      }
    }
  );
});

app.put("/UpdateVenuebooking", (req, res) => {
  const Id = req.body.id;

  connection.query(
    "UPDATE venue_booking SET status='Confirmed' WHERE id =?",
    [Id],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        }
      }
    }
  );
});
app.put("/UpdateVenuebooking1", (req, res) => {
  const Id = req.body.id;

  connection.query(
    "UPDATE venue_booking SET status='Cancelled' WHERE id =?",
    [Id],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        }
      }
    }
  );
});

app.get("/getTeamData", function (req, res) {
  const name = req.body.name;
  connection.query(
    "SELECT * FROM player WHERE team =?",
    [name],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
        }
      }
    }
  );
});
app.post("/getEquipmentData", function (req, res) {
  const id = req.body.id;
  connection.query(
    "SELECT * FROM product WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error querying the database: ", err);
        res.status(500).send({ message: "Error querying the database" });
      } else {
        if (result.length > 0) {
          const equipment = result[0];
          res.send(equipment);
        } else {
          res.status(404).send({ message: "Equipment not found" });
        }
      }
    }
  );
});

app.put("/updateEquipment/:id", (req, res) => {
  const equipmentId = req.params.id;
  const { type, name, count } = req.body;

  connection.query(
    "UPDATE product SET type = ?, name = ?, count = ? WHERE id = ?",
    [type, name, count, equipmentId],
    (err, result) => {
      if (err) {
        console.error("Error updating equipment: " + err);
        res.status(500).json({ message: "Error updating equipment" });
      } else {
        console.log("Equipment updated successfully");
        res.json({ message: "Equipment updated successfully" });
      }
    }
  );
});

app.put("/updateVenue/:id", (req, res) => {
  const venueId = req.params.id;
  const { type, name, location } = req.body;

  connection.query(
    "UPDATE venue SET type = ?, name = ?, location = ? WHERE id = ?",
    [type, name, location, venueId],
    (err, result) => {
      if (err) {
        console.error("Error updating Venue: " + err);
        res.status(500).json({ message: "Error updating Venue" });
      } else {
        console.log("Venue updated successfully");
        res.json({ message: "Venue updated successfully" });
      }
    }
  );
});

app.get("/getCricket", function (req, res) {
  let sql = "SELECT * FROM teamschedule WHERE type='Cricket'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getVollyS", function (req, res) {
  let sql = "SELECT * FROM teamschedule WHERE type='Volleyball'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/getBadmintonSchedule", function (req, res) {
  let sql = "SELECT * FROM teamschedule WHERE type='Badminton'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getFutsalSchedule", function (req, res) {
  let sql = "SELECT * FROM teamschedule WHERE type='Futsal'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getBasketballSchedule", function (req, res) {
  let sql = "SELECT * FROM teamschedule WHERE type='Basketball'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/getSchedule", function (req, res) {
  let sql = "SELECT * FROM teamschedule ";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getBiddingData", function (req, res) {
  let sql = "SELECT * FROM league_bidding ";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getEquipment", function (req, res) {
  let sql = "SELECT * FROM product ";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getLeague", function (req, res) {
  let sql = "SELECT League_name FROM league ";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getLeague1", function (req, res) {
  let sql = "SELECT * FROM league where League_Type='Cricket'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getLeagueFutsal", function (req, res) {
  let sql = "SELECT * FROM league where League_Type='Futsal' ";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getLeagueData", function (req, res) {
  let sql = "SELECT League_Name FROM matches ";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getBooking", function (req, res) {
  let sql = "SELECT * FROM equip_booking where status='pending'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getVenueBooking", function (req, res) {
  let sql = "SELECT * FROM venue_booking where status='pending'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getBookingrecord", function (req, res) {
  let sql =
    "SELECT * FROM equip_booking where status!='pending' ORDER BY id DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getResultrecord", function (req, res) {
  let sql = "SELECT * FROM Result  ORDER BY id DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.get("/getVenueBookingrecord", function (req, res) {
  let sql =
    "SELECT * FROM venue_booking where status!='pending' ORDER BY id DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.put("/updateteam", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const date = req.body.date;
  const type = req.body.type;
  connection.query(
    "UPDATE teams SET name = ? , date = ?,type=? WHERE id = ?",
    [name, date, type, id],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("Enter CORRECT ASKED DETAILS");
      }
    }
  );
});
app.put("/updateProd", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const count = req.body.date;
  connection.query(
    "UPDATE product SET name = ? count = ? WHERE id = ?",
    [name, count, id],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("Enter CORRECT ASKED DETAILS");
      }
    }
  );
});
app.put("/updateteamfromplayer", (req, res) => {
  const preTeam = req.body.preTeam;
  const curTeam = req.body.curTeam;
  connection.query(
    "UPDATE player SET team = ? WHERE team = ?",
    [curTeam, preTeam],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("Enter CORRECT ASKED DETAILS");
      }
    }
  );
});

app.post("/getScheduleData", function (req, res) {
  const type = req.body.type;
  connection.query(
    "SELECT * FROM teams WHERE type = ?",
    [type],
    function (err, results) {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post("/teamSchedule", (req, res) => {
  const { teamA, teamB, date, time, venue, type } = req.body;
  connection.query(
    "SELECT * FROM teamSchedule WHERE date = ? and time = ?",
    [date, time],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "already exist" });
        } else {
          connection.query(
            "INSERT INTO teamschedule (teamA,teamB,date,time,venue,type) VALUES(?,?,?,?,?,?)",
            [teamA, teamB, date, time, venue, type],
            (err, result) => {
              if (result) {
                res.send(result);
              } else {
                res.send("Enter CORRECT ASKED DETAILS");
              }
            }
          );
        }
      }
    }
  );
});
app.get("/Getplayers/:teamId", function (req, res) {
  const teamId = req.params.teamId;
  connection.query(
    "SELECT * FROM player WHERE team = ?",
    [teamId],
    function (err, results) {
      if (err) {
        console.error("Error fetching player data:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching player data" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
app.put("/DeleteSchedule", function (req, res) {
  const matchId = req.body.id;
  const deleteSql = "DELETE FROM teamschedule WHERE id = ?";
  connection.query(deleteSql, [matchId], function (err, result) {
    if (err) {
      console.error("Error deleting match:", err);
    } else {
    }
  });
});

app.post("/AddTeamS", upload.single("photo"), (req, res) => {
  const { teamName } = req.body;
  const photo = req.file;
  if (!teamName || !photo) {
    return res.status(400).json({ error: "Team name and photo are required" });
  }
  const sql = "INSERT INTO teams1 (team_name, photo) VALUES (?, ?)";
  db.query(sql, [teamName, photo.buffer], (err, result) => {
    if (err) {
      console.error("Error adding team:", err);
      res.status(500).json({ error: "Failed to add team" });
    } else {
      res.status(200).json({ message: "Team added successfully" });
    }
  });
});

app.post("/addMatchResult", (req, res) => {
  const { id, teamA, teamB, date, winner } = req.body;
  const sql =
    "INSERT INTO result (id,  team1, team2,date,winner) VALUES (?, ?, ?,?,  ?)";
  connection.query(sql, [id, teamA, teamB, date, winner], (err, result) => {
    if (err) {
      console.error("Error adding match result: " + err.stack);
      res.status(500).json({ message: "Error adding match result" });
    } else {
      console.log("Match result added successfully.");
      res.status(200).json({ message: "Match result added successfully" });
    }
  });
});
app.post("/addLeagueMatchResult", (req, res) => {
  const { id, teama, teamb, league, date, winner } = req.body;
  const sql =
    "INSERT INTO leagueresult (id,  team1, team2,League_Name,date,winner) VALUES (?, ?,?, ?,?,  ?)";
  connection.query(
    sql,
    [id, teama, teamb, league, date, winner],
    (err, result) => {
      if (err) {
        console.error("Error adding match result: " + err.stack);
        res.status(500).json({ message: "Error adding match result" });
      } else {
        console.log("Match result added successfully.");
        res.status(200).json({ message: "Match result added successfully" });
      }
    }
  );
});
app.get("/getTeamsByLeague", function (req, res) {
  const LeagueName = req.body.LeagueName;
  let sql = "SELECT name FROM leagueteams WHERE League_Name = ?";
  connection.query(sql, [LeagueName], function (err, results) {
    if (err) {
      console.error("Error fetching teams:", err);
      res.status(500).json({ message: "Error fetching teams" });
    } else {
      res.json(results);
    }
  });
});

app.get("/getLeagueResult", (req, res) => {
  const { Leaguename } = req.query;
  connection.query(
    "SELECT * FROM leagueresult WHERE League_Name = ?",
    [Leaguename],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(result);
      }
    }
  );
});
app.get("/getteamsleague", (req, res) => {
  const Leaguename = req.query.Leaguename; // Make sure it matches the frontend parameter name

  // Query the database to get teams
  connection.query(
    "SELECT name FROM leagueteams WHERE League_Name = ?",
    [Leaguename],
    (err, results) => {
      if (err) {
        console.error("Error fetching teams:", err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        // Return the teams data as JSON
        res.json(results);
      }
    }
  );
});

module.exports = connection;

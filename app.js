"use strict";

const express = require("express");
const multer = require("multer");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

/**
 * If the search parameter is included, returns the product data that matched
 * the search term. If not, returns all the product data. Returns in JSON format.
 */
app.get("/products", async function(req, res) {
  try {
    let db = await getDBConnection();
    let search = req.query.search;
    let rows = await getProducts(search, db);
    await db.close();
    res.json(rows);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

app.post("/login", async function(req, res) {
  res.type("text");
  try {
    let db = await getDBConnection();
    let username = req.body.username;
    let password = req.body.password;
    if (!(username && password)) {
      res.status(400).send("Missing one or more of the required params.");
    } else {
      let info = await db.get("SELECT username, password FROM users WHERE username=?;", [username]);
      if (info) {
        if (info.username === username && info.password === password) {
          await db.close();
          res.send("Logged in successfully!");
        } else {
          res.send("Username and password does not match.");
        }
      } else {
        res.status(400).send("Username does not exist.");
      }
    }
  } catch (error) {
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

/**
 * Returns the detail of a selected product in JSON format.
 */
app.get("/products/:product", async function(req, res) {
  try {
    let db = await getDBConnection();
    let product = req.params.product;
    let qry = "SELECT * FROM products WHERE name=?;";
    let rows = await db.all(qry, [product]);
    await db.close();
    res.json(rows);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

app.post("/buy", async function(req, res) {
  try {
    let db = await getDBConnection();
    let productId = req.body.productId;
    // update capacity in db, create confirmation number
    let qry = SELECT
              FROM products p, users u
              WHERE p.product_id = productId AND
    let info = await db.get("SELECT name, capacity, availability FROM products WHERE product_id=?;", [productId]);
    let quantity = parseInt(info.capacity);
    if (quantity > 0) {
      quantity--;
      await db.run("UPDATE products SET capacity=? WHERE product_id=?;", [String(quantity), productId]);
      await db.run("INSERT INTO transactions (username, product_id, product_name) VALUES (?, ?, ?);", [String(quantity), productId]);
      if (quantity === 0) {

      }
    }

    await db.close();
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

app.post("/signup", async function(req, res) {
  res.type("text");
  try {
    let db = await getDBConnection();
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    if (!(email && username && password)) {
      res.status(400).send("Missing one or more of the required params.");
    } else {
      let validEmail = email.match(/^(\w|\.)+@[A-Za-z]+\.(com|org|edu)$/);
      if (validEmail === null) {
        res.status(400).send("Email format is invalid.");
      } else {
        let qry = "INSERT INTO users (username, email, password) VALUES (?, ?, ?);";
        await db.run(qry, [username, email, password]);
        await db.close();
        res.send("Signed up successfully!");
      }
    }
  } catch (error) {
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});
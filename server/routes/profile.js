const express = require('express');
const passport = require('passport');
const {Users} = require('../db/sequelize');
const Profile = express.Router();

Profile.get('/', async (req, res) => {
  try {
    console.log('get profile', req.user);
    res.status(201).send(req.user);
    
  } catch (err) {
    console.log('get prof err', err);
    res.sendStatus(500);
  }
});

module.exports = {Profile};

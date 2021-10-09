
const { Sequelize } = require('sequelize');
const db = new Sequelize('bike', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING
  },
  familyName: {
    type: Sequelize.STRING,
  },
  givenName: {
    type: Sequelize.STRING
  },
  fullName: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
 
});
 
const Landmarks = db.define('landmarks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  kind: {
    type: Sequelize.STRING
    
  },
  details: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  },
  fullName: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.STRING
  },
  lng: {
    type: Sequelize.STRING
  },
  date_id: {
    type: Sequelize.DATE
  }
});

const Events = db.define('events', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventsName: {
    type: Sequelize.STRING, //point back to u googleid
  },
  hostName: {
    type: Sequelize.STRING
  },
  details: {
    type: Sequelize.STRING
  },
  date_id: {
    type: Sequelize.DATE,
    
  },
  time_id: {
    type: Sequelize.TIME,
    
  },
  lat: {
    type: Sequelize.STRING
  },
  lng: {
    type: Sequelize.STRING
  }
 
});

const Rsvps = db.define('rsvps', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER //point back to user id
  },
  eventId: {
    type: Sequelize.INTEGER //foreign key references event id
  },
  fullName: {
    type: Sequelize.STRING
  },
});

const Message = db.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subject: {
    type: Sequelize.STRING,
    defaultValue: ''
  }, 
  text: {
    type: Sequelize.STRING
  },
  userFromId: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id'
    }
  },
  userToId: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id'
    }
  }


});
Message.belongsTo(Users, {foreignKey: 'userFromId', as: 'receivedFrom'});
Message.belongsTo(Users, {foreignKey: 'userToId', as: 'sentTo'});




const Following = db.define('following', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userAdding: { //user who is making the add
    type: Sequelize.INTEGER, //foreign key for User.id
    references: {
      model: Users,
      key: 'id'
    }
  },
  userTarget: { //user who is being followed
    type: Sequelize.INTEGER, //foreign key for User.id
    references: {
      model: Users,
      key: 'id'
    }
  } 
});

Following.belongsTo(Users, {foreignKey: 'userAdding', as: 'followerAdder'});
Following.belongsTo(Users, {foreignKey: 'userTarget', as: 'followingTarget'});


/**
 * the User.hasMany relationships here etc.  i dont think any functions are using the event/rsvp schema yet
 */

Users.hasMany(Rsvps);
Events.hasMany(Rsvps); 
Following.belongsTo(Users);

//Users.belongsToMany(Users, {as: 'Children', through: 'Following'})


Users.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Landmarks.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Events.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Rsvps.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Message.sync() 
  .then(() => console.log('messages synced'))
  .catch((err) => console.log(err));

Following.sync()
  .then(() => {
    console.log('Connection has been established successfully.following');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = {Users, Landmarks, Message, Events, Rsvps, Following, db};

/** right now these match the db schema, so sequelized can be used in the fture but the original functionscan use the helpers queries in raw mysql syntax.  However, if errors happen--- Sequelize.STRING type is varchar(255) -- the varchar(40) should be updated in the schema and i do not know yet if the dats will be compatible.
 * 
 * I had to add columns in the mysql schema for updatedAt and createdAt to be compatible with sequelize.
 * 
 * I also adjuusted the primary key because I think it is a better choice to have the primary key be what is generated in the db and not referencing the googleId.  
 */

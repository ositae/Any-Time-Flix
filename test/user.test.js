const app = require('../app');
const request = require('supertest');
const expect = require('chai').expect;
const { User } = require('../models');

const newUser = {
    firstName: "Mark",
    lastName: "Zuckerberg",
    userName: "metaFounder",
    city: "Palo Alto",
    state: "California",
    country: "USA",
    email: "markzuckerberg@facebook.com",
    password: "Metamark1",
    bio: "CEO of Meta",
    profilePicture: "picture.jpeg",
}

// test home route
describe('GET /', () => {
  it('should return status code 200 on successful GET request', (done) => {
    request(app).get('/')
    .expect(200, done);
  });
});

// test users
describe('GET /users', () => {
  it('should return status code 200 on successful GET request', (done) => {
    request(app).get('/users/test')
    .expect(200, done);
  });
});

// create new user with users/signup POST route
describe('POST /users/signup', () => {
  it('should create a signup user with valid email', (done) => {
    const email = "markzuckerberg@email.com" 
    request(app).post('/users/signup/').type('form').send({
      firstName: "Mark",
      lastName: "Zuckerberg",
      userName: "metaFounder",
      city: "Palo Alto",
      state: "California",
      country: "USA",
      email: email,
      password: "Metamark1",
      bio: "CEO of Meta",
      profilePicture: "picture.jpeg",
  })
    .then(response => {
      console.log('new user created: ', response._body);
      expect(response._body.user.email).to.be.equal(email);
      done();
    })
    .catch(error => {
      console.log("Error in creating new user: ", error);
      throw error;
    })
  })
  it('should return a 200 response', (done) => {
    const email = "markzuckerberg@facebook.com";
    request(app).post('/users/signup')
    .type('form')
    .send({
      firstName: "Mark",
      lastName: "Zuckerberg",
      userName: "metaFounder",
      city: "Palo Alto",
      state: "California",
      country: "USA",
      email: email,
      password: "Metamark1",
      bio: "CEO of Meta",
      profilePicture: "picture.jpeg",
  })
  .expect(200, done());
  })
});

// update user info with PUT route
 describe('PUT /users/:id', () => {
  before(async () => {
      createdUserEmail = "";
  });

  it('updates user data and returns the updated user', async () => {
      const updatedData = {
          bio:"",
    
      };

      const response = await request(app)
          .put(`/users/${createdUserEmail}`)
          .send(updatedData);

      expect(response.status).to.equal(200);
      expect(response.body).to.include(updatedData);
  });

});


describe('PUT /users/:id', () => {
  it('should update an existing user bio', (done) => {
    request(app).post('/users/signup/') // create new user
    .type('form')
    .send(newUser) // send new user to front
    .then(response => {
      console.log('new user created', response._body); // return message
      // get the id from the newly created user and add to the update object
      const userId = response._body.newUser._id; // get id new user created
      console.log('---userId---', userId);
      const  newBio  =  "" ; // new bio as a string
      const updatedUser = Object.assign({}, newUser, {_id : userId,
        bio: newBio }); // create variable object with new user and check for user id and update bio
        // send a put request to update the users bio
        request(app).put(`/users/${updatedUser}`)
        .type('form')
        .send(updatedUser)
        .then(updatedResponse => {
          expect(updatedResponse.body.user.bio).toEqual(updatedUser);
          done();
        })
        .catch(error => {
          console.log("Error in updating user", error);
          throw error;
        })
        })
        .catch((err)=>{console.log("Error creating user", err)});
        });
        it('should return status 404 if no user is found', (done) =>
        request(app).put("/users/1789365").send()
        .expect(404, done()));
        });





// DELETE user route
describe('DELETE /users/:id - delete user by ID', () => {
  it('should return status 200 on successful deletion of existing user', (done) => {
    let testUser = {username:'testDeleteUser' + Math.random(), password: 'testPassword123!'};
    User.create(testUser)
    .then(createdUser => {
      request(app)
      .delete(`/users/${createdUser._id}`)
      .expect(200, done);
      })
      .catch(err => {throw err});
      });
      });
      it('should return status 404 when deleting a nonexistant user', (done
        ) => {
          request(app)
          .delete('/users/signup')
          .expect(404, done());
          });

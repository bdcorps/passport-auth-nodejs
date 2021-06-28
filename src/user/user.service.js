const addGoogleUser = (User) => ({ id, email, firstName, lastName, profilePhoto }) => {
  console.log(id, email, firstName, lastName, profilePhoto)

  const user = new User({
    id, email, firstName, lastName, profilePhoto, source: "google"
  })
  return user.save()
}

const addLocalUser = (User) => ({ id, email, firstName, lastName, password }) => {
  const user = new User({
    id, email, firstName, lastName, password, source: "local"
  })
  return user.save()
}

const getUsers = (User) => () => {
  return User.find({})
}

const getUserByEmail = (User) => async ({ email }) => {
  return await User.findOne({ email })
}

module.exports = (User) => {
  return {
    addGoogleUser: addGoogleUser(User),
    addLocalUser: addLocalUser(User),
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User)
  }
}
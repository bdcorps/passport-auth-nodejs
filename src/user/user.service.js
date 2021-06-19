const addGoogleUser = (User) => ({ id, email, firstName, lastName, profilePhoto }) => {


  const user = new User({
    id,
    email,
    firstName,
    lastName,
    profilePhoto,
    source: "google"
  })
  return user.save()
}

const getUsers = (User) => () => {
  return User.find({})
}

const getUserByEmail = (User) => async (email) => {
  return await User.findOne({ email })
}

module.exports = (User) => {
  return {
    addUser: addUser(User),
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User)
  }
}
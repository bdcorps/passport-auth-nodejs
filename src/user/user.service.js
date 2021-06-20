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

const getUserByEmail = (User) => async (email, source) => {
  return await User.findOne({ email, source })
}

module.exports = (User) => {
  return {
    addGoogleUser: addGoogleUser(User),
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User)
  }
}
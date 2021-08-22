module.exports = {
    authentication: {
      options: {
        userName: "benkohle",
        password: "Tennisgolf@1"
      },
      type: "default"
    },
    server: "eni-energy.database.windows.net",
    options: {
      database: "TechTeacher",
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
};
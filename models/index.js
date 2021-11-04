const User = require("./user");
let Claim = require("./claim");
let Warranty = require("./warranty");

User.hasMany(Claim);
Claim.belongsTo(User);

User.hasMany(Warranty);
Warranty.belongsTo(User);

module.exports = { User, Claim, Warranty };

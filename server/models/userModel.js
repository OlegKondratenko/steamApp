const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ['driver', 'shipper'],
      message: 'role is either driver or shipper',
    },
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
  trucks: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Trucks',
    get: function (trs) {
      if (this.role === 'driver') {
        return trs;
      }
      return 'Have no access';
    },
  },
  assignedLoads: {
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'Loads',
    get: function (assignedLoads) {
      const userRole = String(this.role).toLowerCase();
      if (userRole === 'driver') {
        return assignedLoads;
      }
      return 'Have no access to assigned loads';
    },
  },
  loads: {
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'Loads',
    get: function (loads) {
      const userRole = String(this.role);
      if (userRole === 'shipper') {
        return loads;
      }
      return 'Have no access to loads';
    },
  },

});

const UserModel = mongoose.model('Users', userSchema);

module.exports = {
  UserModel,
};
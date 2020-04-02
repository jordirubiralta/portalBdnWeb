const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const OrganizatorSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
    
});

OrganizatorSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

OrganizatorSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Organizator', OrganizatorSchema);
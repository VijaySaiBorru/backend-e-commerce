const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    profileImage: String,
    bio: { type: String, maxlength: 200 },
    profession: String,
    team: { type: String }, // Assigned IPL team
    createdAt: { type: Date, default: Date.now },
});

// Pre-save middleware to hash the password and assign IPL team
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    // IPL team list for random assignment
    const teams = [
        'chennai-super-kings',
        'mumbai-indians',
        'kolkata-knight-riders',
        'delhi-capitals',
        'gujarat-titans',
        'royal-challengers-bangalore',
        'lucknow-super-giants',
        'sunrisers-hyderabad',
        'rajasthan-royals',
        'punjab-kings'
    ];

    // Randomly assign an IPL team
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];
    user.team = randomTeam;

    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);
module.exports = User;

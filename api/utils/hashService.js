import bcrypt from 'bcrypt';

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePasswords = async(password, hash) => {
    return bcrypt.compare(password, hash);
};


export {hashPassword, comparePasswords};
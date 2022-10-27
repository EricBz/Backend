import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => {
    console.log("Paso por bcrypt", password, user.password)
    return bcrypt.compareSync(password, user.password)};

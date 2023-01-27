import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthModel from "../model/auth.js";


export const regsiter = async (req, res, next) => {
    const {name, email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new AuthModel({
        name : name,
        email : email,
        password : passwordHash
    });

    newUser.save()
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
        console.log(error);
    })
}   

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await AuthModel.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};


export const getUser = async (req, res, next) => {
    try {
        const users = await AuthModel.findAll({
            attributes : ['id', 'name', 'email']
        });
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}
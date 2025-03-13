import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

export const protect = async (req, res, next) => {
    try {
        const token = req.cookie.jwt

        if (!token) {
            return res.status(401).json({ message: 'Unautorized User error' });
        }
        
        const decoded = jwt.verify(token, process.env.secretKey)
        
        if (!decoded) {
            return res.status(401).json({ message: 'Unautorized User error - Invalid token' });
        }
        
        
        const user = User.findById(decoded.userId).select('-password')
        
        req.user = user
        
        next()
        
    } catch (error) {
        console.log('Internal Error ', error.message)
        return res.status(500).json({ message: 'Internal Error Occurred' });
    }
}
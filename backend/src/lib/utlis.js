import jwt from 'jsonwebtoken'

export const webToken = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.secretKey, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development'
    })

    return token
}
import express from "express"
// const express = require('express') - when we are using a "type" : "common"

const app = express()

app.listen(5001, () => {
    console.log('Server is ready to run on port 5001');
})
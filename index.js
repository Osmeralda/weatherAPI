const PORT = process.env.PORT || 2600
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response, json } = require('express')
const app = express()

let yrData = [];
let forecaData = [];

let yr = `https://www.yr.no/en/forecast/daily-table/2-643492/Finland/Northern%20Ostrobothnia/Oulu/Oulu`
let foreca = `https://www.iltalehti.fi/saa/Suomi/Oulu`

app.get('/', (req, res) => {
    res.json('welcome to my api')
}) 

app.get('/saayr', (req, res) => {
    axios.get(yr)
    .then(response => {
        const yrhtml = response.data
        const $ = cheerio.load(yrhtml)

        $('.now-hero__next-hour-temperature-text', yrhtml).each(function() {
        const yrAste = $(this).text()
        Number(yrAste)
        //console.log(typeof Number(yrAste));
        yrData.push({
            yrAste
        })
    })

    res.json(yrData)
    }).catch(err => (err))
    })


    app.get('/saaforeca', (req, res) => {
        axios.get(foreca)
        .then(response => {
            const forecahtml = response.data
            const $ = cheerio.load(forecahtml)
    
            $('.current', forecahtml).each(function() {
                const forecaAste = $(this).text()
                Number(forecaAste)
                //console.log(typeof Number(forecaAste));
                forecaData.push({
                    forecaAste
                })
            })
            res.json(forecaData)
        }).catch(err => (err));
    })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
require('../models/db');
const Hotel = require('../models/hotel');

/**
 * ? /api/hotels
 * ! GET All Hotels
 * **/


exports.listHotels = async(req, res) => {
    // res.send('Aduonye! Are you here yet?');

    // Query to help search for room category
    let { limit= 20, page = 1, category, q } = req.query;
    const limitRecords = parseInt(limit);
    const skip = ( page -1 )* limit;

    //Query to capture all the hotels available
    let query = {};
    
    if(q){ 
        query = {$text: {$search: q}};
    }
    if(category) query.category = category;
    // console.log(query);

    try {
        const hotels = await Hotel.find({query}).limit(limitRecords).skip(skip);
        res.json({page: page, limit:limitRecords, hotels});
    } catch (error) {
        res.status(400).json({ message: error})
    }
}

/**
 * ? /api/hotels
 * ! POST one hotel at a time
 * **/

exports.insertSingleHotel = async(req, res) => {
    const newHotel = new Hotel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });

    try {
        await newHotel.save();
        res.json(newHotel);
    } catch (error) {
        res.status(400).json({ message: error})
        
    }
}

/**
 * ? /api/hotels/:id
 * ! PATCH one hotel at a time
 * **/

exports.updateSingleHotel = async(req, res) => {
    let paramID = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let category = req.body.category;

    try {
     const updateHotel = await Hotel.updateSingle({ _id:paramID}, {name:name}, {price:price}, {category:category})   ;
     res.json(updateHotel);
    } catch (error) {
        res.status(400).json({ message: error}) 
    }
}

/**
 * ? /api/hotels/:id
 * ! DELETE one hotel at a time
 * **/

exports.deleteSingleHotel = async(req, res) => {
    let paramID = req.params.id;
     
    try {
     const deleteHotel = await Hotel.deleteSingle({ _id:paramID})   ;
     res.json(deleteHotel);
    } catch (error) {
        res.status(400).json({ message: error}) 
    }
}

//Created the database to hold the hotels
// async function insertHotels(){
//     try {
//        await Hotel.insertMany([
//         {
//             "name": "Single Room",
//             "price": 10000,
//             "category": ["small", "medium", "large"]
//         },
//         {
//             "name": "Double Room",
//             "price": 18000,
//             "category": ["ensuite", "large"]
//         },
//         {
//             "name": "Studio Room",
//             "price": 40000,
//             "category": ["ensuite", "medium", "large"]
//         },
//         {
//             "name": "Deluxe Room",
//             "price": 100000,
//             "category": ["small", "medium", "large"]
//         },
//         {
//             "name": "Suites",
//             "price": 10000,
//             "category": ["large"]
//         },

//        ]) 
//     } catch (error) {
//         console.log(error);
//     }
// }

// insertHotels();
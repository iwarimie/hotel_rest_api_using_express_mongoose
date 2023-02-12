const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

/**
 * ! App Routes
 * **/
router.get('/api/hotels/', hotelController.listHotels);
router.post('/api/hotels/', hotelController.insertSingleHotel);
router.patch('/api/hotels/:id', hotelController.updateSingleHotel);
router.delete('/api/hotels/:id', hotelController.deleteSingleHotel);





module.exports = router;
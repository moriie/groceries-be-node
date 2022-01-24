const express = require('express');
const router = express.Router();
const Basket = require('../models/basket')


//get all baskets
router.get('/:id', (req,res)=>{
    const user_id = req.params.id;
    let list = Basket.find({owner: user_id});
    res.json(list);
})

//create new baskets
router.get(':id/create', (req,res)=>{
    const basket = req.body;

    const newbasket = new Basket({
        name: basket.name,
        description: basket.description,
        items: basket.items,
        owner: req.params.id
    })

    newbasket.save()
    res.json({message: `New basket ${newbasket.name} created!`})
})

//edit specific basket

//delete specific basket

module.exports = router;
const express = require('express');
const Common = require('../model/common');
const router = express.Router();
//common example router


//get all
router.get('/', async (req, res) => {

    try 
    {
        //res.send('Hello World!');
        const common = await Common.find();
        res.json(common);
    } catch (err) {
        res.status(500).json({message: err.message });
    }

    
});

// get one
router.get('/:id', getById, (req, res) => {
    res.status(200).json(res.item);
});

// create one
router.post('/', async (req, res) => {

    const common = new Common ({
        name: req.body.name,
        description: req.body.description   
       });

    try 
    {
        const newCommon = await common.save();
        res.status(201).json(newCommon);
    } catch (err) {
        res.status(400).json({message: err.message });
    }

});

//update one
router.patch('/:id', getById, async (req, res) => {

    if (req.body.name != null) {
        res.item.name = req.body.name;
    }

    if (req.body.description != null) {
        res.item.description = req.body.description;
    }

    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({message:err.message});
    }

});

//delete one
router.delete('/:id', getById, async (req, res) => {

    try {
       await res.item.remove();
       res.json({ message : 'item removed'});
    } catch (err) {
        res.status(500).json({message: err.message });
    }

});


async function getById(req, res, next) {
    let item;
    try {
       item = await Common.findById(req.params.id);
       if (item ==null) {
           return res.status(404).json({ message: 'cannot find item'});
       } 
    } catch (err) {
          return res.status(500).json({ message: err.message});
    }
   res.item = item; 
   next();
}



module.exports = router;
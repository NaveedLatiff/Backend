const data = require('../utils/dataStore');

exports.rentHouse=(req, res) => {
    res.render('rentHome',{title:"Rent-House"})
}

exports.thankUser=(req, res) => {
    let name = req.body.fullName;
    let city=req.body.houseCity;
    let price=req.body.housePrice;
    let rooms=req.body.houseRooms;
    data.unshift({name,city,price,rooms});
    res.render('thankYou', { name,title:"ThankYou" });
    
}

exports.showData=(req,res)=>{
 res.render('index',{data,title:"Home"});
}
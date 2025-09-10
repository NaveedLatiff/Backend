const registeredHouse=require('../models/houses')
exports.rentHouse=(req, res) => {
    res.render('rentHome',{title:"Rent-House"})
}

exports.thankUser=(req, res) => {
    const house=new registeredHouse(req.body.fullName,req.body.houseCity,req.body.housePrice,req.body.houseRooms)
    house.save()
    let name=req.body.fullName
    res.render('thankYou', { name,title:"ThankYou" });
}

exports.showData=(req,res)=>{
    let data=registeredHouse.fetch()
 res.render('index',{data,title:"Home"});
}
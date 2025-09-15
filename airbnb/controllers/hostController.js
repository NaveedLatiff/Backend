const registeredHouse=require('../models/houses')
exports.rentHouse=(req, res) => {
    res.render('host/rentHome',{title:"Rent-House"})
}

exports.thankUser=(req, res) => {
    const house=new registeredHouse(req.body.fullName,req.body.houseCity,req.body.housePrice,req.body.houseRooms,req.body.houseImg)
    house.save()
    let name=req.body.fullName
    res.render('host/thankYou', { name,title:"ThankYou" });
}

exports.hostHomes=(req,res)=>{
    registeredHouse.fetch((houses)=>{
        res.render('host/host-houses-list',{data:houses,title:"Home"});
    })
}

const checkMillionDollarIdea = (req, res, next) => {
    
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
   
    if (numWeeks === undefined || weeklyRevenue === undefined
        || isNaN(numWeeks) || isNaN(weeklyRevenue)) {  
        res.status(400).send();    
    } 
    

    const totalValue = numWeeks*weeklyRevenue;

    if (totalValue < 1000000) {
        res.status(400).send();
    } else {
        next();
    }

    return totalValue;
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
  
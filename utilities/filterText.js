module.exports = function (companyName){
    return function (search,replace ){
        return companyName.replace(search, replace);
    }
};
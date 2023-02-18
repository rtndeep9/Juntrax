module.exports =(err, res)=> {
    let message;
    if(err.response ) {
        console.log("Error", err.response.data);
        message = err.res.data.description
    } else if (err.request){
        console.log("Error", err.request);
        message = err.request.message;
    } else {
        console.log(err.stack);
        message = err.message;
    }
    let result = {
        "code": err.code,
        "success" : false,
        "message" : message
    }
    return res.status(err.code || 500).json(result)
}
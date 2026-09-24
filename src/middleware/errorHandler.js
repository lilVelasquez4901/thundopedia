function errorHandler(err,req,res,next){ 
    const status = err.status ?? 500
    if(status >= 500){
        console.error(err)
    res.status(status).json({
        error:{
            code:err.code ?? 'INTERNAL_ERROR',
            message:'Something went wrong SMH What did you do'
        }
    })} else if(status >= 400){
        console.error(err)
    res.status(status).json({
        error:{
            code:err.code ?? 'BAD_REQUEST',
            message:'Hey, dummy, what am I supposed to do with this'
        }
    })} else if(status >= 409){
        console.error(err)
        res.status(status).json({
            error:{
                code:err.code ?? 'CONFLICTING',
                message:`You keep using that word. I do not think it means what you think it means`
            }
    })} else{
        console.log(err)
        res.status(status).json({
            error:{
                code:err.code ?? 'UNKNOWN',
                message:`Whatever you're doing, we did not account for. take that as you will`
            }
        })
    }
}
module.exports = errorHandler
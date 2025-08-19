export const sendToken=(user,statusCode, message,res)=>{
    const token=user.getJWTToken();

        const expireDays = Number(process.env.EXPIRE_COOKIE);

    // options for cookies
    const options={
        expires: new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000),
        httpOnly:true
    }
    res.status(statusCode)
    .cookie('token',token,options)
    .json({
        success:true,
        message:message,
        user,
        token
    })
}
let authToken;

function setToken(token){
    authToken = token
}

function getToken(){    
    return authToken
}

export {setToken,getToken};
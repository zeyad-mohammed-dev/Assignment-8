export class NotFoundException extends Error{
constructor(name = 'url'){
    super(`❌ not found ${name}` , {cause:404})
}
}

export class NotValidEmailException extends Error{
    constructor(){
        super("❌ Not Valid Email" , {cause: 400})
    }
}

export class NotValidCredentialsException extends Error{
    constructor(){
        super("❌ Not Valid Credentials" , {cause : 400})
    }
}

export class NotValidTokenException extends Error{
    constructor(){
        super("❌ Not Valid Token ",{cause:403})
    }
}

export class NotValidUserIdException extends Error{
    constructor(){
        super('❌ invalid entered userId pleace try again !', { cause: 400 })
    }
}

export class UnAuthorizedException extends Error{
    constructor(){
        super('❌ you are not the owner', { cause: 403 })
    }
}


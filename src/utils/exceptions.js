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
        super("❌ Not Valid Token ")
    }
}
export class NotFoundException extends Error{
constructor(name = 'url'){
    super(`❌ not found ${name}` , {cause:404})
}
}

export class NotValidEmail extends Error{
    constructor(){
        super("❌ Not Valid Email" , {cause: 400})
    }
}

export class NotValidCredentials extends Error{
    constructor(){
        super("❌ Not Valid Credentials" , {cause : 400})
    }
}
lass ExpressError  extends Error { // error class is inheriting properties from express error class
   constructor(status , message){
     super();
     this.status = status;
     this.message = message;
   }
}

module.exports = ExpressError;

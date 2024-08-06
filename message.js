class Message {
   // Constructor: Initializes a new Message instance
   constructor(name, commands) {

     if (!name) {
       throw new Error('Message name required.');
     }
     // Set the name property of the Message instance
     this.name = name;
     this.commands = commands;
   }
 }

 module.exports = Message;
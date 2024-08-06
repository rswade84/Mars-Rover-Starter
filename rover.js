class Rover {
   // Constructor: Initializes a new Rover instance
   constructor(position) {
     if (!position) {
       throw new Error('Rover position required.');
     }
 
     this.position = position; 
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
 
   // Method to handle incoming messages with commands
   receiveMessage(message) {
     let results = [];
 
     // Iterate over each command in the message
     for (let command of message.commands) {
       
      // Handle MOVE command
       if (command.commandType === 'MOVE') {
         if (this.mode === 'LOW_POWER') { // Check if the Rover is in LOW_POWER mode
           results.push({ completed: false });
         } else {
           this.position = command.value; // Update Rover's position
           results.push({ completed: true });
         }
       } 
       
      // Handle STATUS_CHECK command
       else if (command.commandType === 'STATUS_CHECK') { // Check if the command is STATUS_CHECK
         results.push({
           completed: true,
           roverStatus: {
             mode: this.mode,
             generatorWatts: this.generatorWatts,
             position: this.position,
           },
         });
       }

      // Handle MODE_CHANGE command
       else if (command.commandType === 'MODE_CHANGE') {
         this.mode = command.value; // Change Rover's mode
         results.push({ completed: true }); // MODE_CHANGE successfully
       } 

       // Handle any other unrecognized command
       else {
         results.push({ completed: false }); // MODE_CHANGE failed
       }
     }
 
     // Return the message name and results of command execution
     return {
       message: message.name,
       results: results,
     };
   }
 }
 
 module.exports = Rover;
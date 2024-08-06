// Import the required classes for testing
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');


  // Test 7: Ensure the constructor requires a position
// Main test suite for the Rover class
describe('Rover class', () => {

  // Test 7: Ensure the constructor requires a position
  // NOTE: Must place new object inside a function to test without parameter. This causes the error.
  test('constructor sets position and default values for mode and generatorWatts', () => {
    expect(
      () => {
        new Rover();
      }).toThrow(new Error('Rover position required.'));
    });



  // Test 8: Check if receiveMessage returns the correct message name
  test('response returned by receiveMessage contains name of message', () => {
    
    // Create commands, a message, and a rover
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('STATUS_CHECK'),
    ];

    let message = new Message('New message!', commands);
    let rover = new Rover(100);

    // Send the message to the rover and check the response
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('New message!');
  });
  


  // Test 9: Verify that receiveMessage returns the correct number of results
  test('response returned by receiveMessage includes two results if two commands are sent in the message', () => {

    // Create commands, a message, and a rover
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('STATUS_CHECK'),
    ];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);

    // Send the message and check the number of results
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });



  // Test 10: Check if STATUS_CHECK command returns correct rover status
  test('responds correctly to status check command', () => {
 
    // Create a STATUS_CHECK command, a message, and a rover
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Rover check status', commands);
    let rover = new Rover(98382);

    // Send the message and compare the response to expected rover info
    let response = rover.receiveMessage(message);
    let roverInfo = {
      mode: rover.mode,
      generatorWatts: rover.generatorWatts,
      position: rover.position,
    };

    expect(response.results[0].roverStatus).toEqual(roverInfo);
  });



  // Test 11: Verify that MODE_CHANGE command updates rover's mode
  test('responds correctly to mode change command', () => {

    // Create a MODE_CHANGE command, a message, and a rover
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Changing Mode to Lower Power', commands);
    let rover = new Rover(98382);

    // Send the message and check if the rover's mode changed
    let response = rover.receiveMessage(message);

    expect(rover.mode).toEqual('LOW_POWER');
    expect(response.results[0].completed).toEqual(true);
  });



  // Test 12: Ensure rover can't move in LOW_POWER mode
  test('responds with false completed value when attempting to move in LOW_POWER mode', () => {

    // Create commands to change mode to LOW_POWER and then try to move
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 2000),
    ];

    let message = new Message('Cant move while at LOW_POWER mode', commands);
    let rover = new Rover(98382);

    // Send the message and check if the MOVE command was not completed
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
    expect(rover.position).toEqual(98382);
  });



  // Test 13: Verify that MOVE command updates rover's position
  test('responds with position for move command', () => {

    // Create a MOVE command, a message, and a rover
    let commands = [new Command('MOVE', 2000)];
    let message = new Message('Moving to position 2000', commands);
    let rover = new Rover(98382);

    // Send the message and check if the rover's position updated
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(2000);
    expect(response.results[0].completed).toEqual(true);
  });
});
// Import the required classes for testing
const Message = require('../message.js');
const Command = require('../command.js');


describe('Message class', () => {
  // Test 4: Ensure the constructor requires a name
  // NOTE: Always use a function with expect().toThrow()
  test('throws error if a name is NOT passed into the constructor as the first parameter', () => {
    expect(() => {
      new Message();
    }).toThrow(new Error('Message name required.'));
  });



  // Test 5: Verify that the constructor correctly sets the name
  test('constructor sets name', () => {
    expect(
      new Message('New message!').name
    ).toEqual('New message!');
  });



  // Test 6: Check if the commands array is correctly stored
  test('contains a commands array passed into the constructor as 2nd argument', () => {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)]; // Similates a message with two commands
    let message = new Message("Here's another message!", commands); // Encapsulates the commands in the message
    expect(
      message.commands // Extracts the commands from the message
    ).toEqual(commands);
  });
});
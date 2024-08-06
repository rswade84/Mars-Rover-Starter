const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.



// Test 1: Verify that the constructor throws an error if a command type is NOT passed into the constructor as the first parameter
describe('Command class', () => {
  test('throws error if command type is NOT passed into constructor as the first parameter', () => {
    expect(
      () => {
      new Command();}
    ).toThrow(new Error('Command type required.'));
  });


  // // Test 2: Verify that the constructor correctly sets the command type
  test('constructor sets command type', () => {
    expect(
      new Command('STATUS_CHECK').commandType
    ).toEqual('STATUS_CHECK'); 
  });



  // Test 3: Verify that the constructor correctly sets the value
  test('constructor sets a value passed in as the 2nd argument', () => {
    expect(
      new Command('MOVE', 20).value
    ).toEqual(20);
  });
});
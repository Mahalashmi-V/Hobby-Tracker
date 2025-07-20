const { addHobby } = require('./hobby');

test('adds a new hobby to the hobby list', () => {
  const hobbies = ['Drawing'];
  const result = addHobby(hobbies, 'Painting');
  expect(result).toContain('Painting');
});

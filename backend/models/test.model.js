const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    string: {
      type: String,
      required: [true, 'String is required field'],
      validate(value) {
        if (!value) {
          throw new Error('Please enter a valid E-mail!');
        }
      },
    },
    pattern: {
      type: String,
      required: [true, 'Pattern is required field'],
    },
    result: {
      type: Boolean,
      required: [true, 'Result is required field'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Test', testSchema);

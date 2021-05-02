const mongoose = require('mongoose');

const OptionSchema = mongoose.Schema({
    label: String,
    value: String,
});
const QuestionSchema = mongoose.Schema(
    {
        label: String,
        formID: Number,
        inputType: String,
        options: [OptionSchema],
    },
    { strict: false }
);
module.exports = mongoose.model('Question', QuestionSchema);

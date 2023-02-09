
const mongoose = require('mongoose');

const KursSchema = new mongoose.Schema({
    kursName: {
        type: String,
    },
    kursAuthor: {
        type: String
    },
    kursPrice: {
        type: Number,
    },
    kursCategory: {
        type: String
    }
});

const Kurs =  mongoose.model("Kurs", KursSchema);
module.exports = Kurs;
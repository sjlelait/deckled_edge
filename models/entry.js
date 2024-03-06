const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    poem: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false },
    public: { type: Boolean, default: false },
    createdBy: String // firebase uid
}, { timestamps: true });

module.exports = mongoose.model('Entry', EntrySchema);
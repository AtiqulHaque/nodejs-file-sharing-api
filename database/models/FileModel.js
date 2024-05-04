const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const FileSchema = new mongoose.Schema(
    {
        private_key: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Please fill your private name'],
        },
        public_key: {
            type: String,
            unique: true,
            required: [true, 'Please fill your public key name'],
        },
        file_name: {
            type: String,
        },
        file_mimetype: {
            type: String,
            required: [true, 'Please fill png_image'],
        },
        last_excess: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false,
    }
);

FileSchema.plugin(mongoosePaginate);

const File = mongoose.model('File', FileSchema, 'files');

module.exports = File;

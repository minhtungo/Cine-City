import mongoose from 'mongoose';
import modelOptions from './modelOptions.js';

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['tv', 'movie'],
    required: true,
  },
  mediaId: {
    type: String,
    required: true,
  },
  mediaTitle: {
    type: String,
    required: true,
  },
  mediaPoster: {
    type: String,
    required: true,
  },
  mediaRating: {
    type: Number,
    required: true,
  },
}, modelOptions);

const favoriteModel = mongoose.model('Favorite', favoriteSchema);

export default favoriteModel;
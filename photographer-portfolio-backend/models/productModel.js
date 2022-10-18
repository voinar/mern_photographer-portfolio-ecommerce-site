import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productSchema = new mongoose.Schema(
  {
    // id: { type: String, required: true, default: () => uuidv4() },
    description: { type: String, required: false },
    imageLarge: { type: String, required: true },
    imageMedium: { type: String, required: true },
    imageSmall: { type: String, required: true },
    album: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventType: { type: String, required: true },
    eventName: { type: String, required: true },
    price: { type: Number, required: true },
    numDownloads: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;

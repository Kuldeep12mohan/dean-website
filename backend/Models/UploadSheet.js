import mongoose from 'mongoose';

const uploadedSheetSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
  },
  data: [
    {
      type: Object,
    },
  ],
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const UploadedSheet = mongoose.model('UploadedSheet', uploadedSheetSchema);

export default UploadedSheet;

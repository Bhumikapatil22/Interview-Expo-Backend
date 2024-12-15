import mongoose from "mongoose";

const questionsSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the timestamp
    },
  },
  { timestamps: true }
);

const questionsModel = mongoose.model("Questions", questionsSchema);

export default questionsModel;

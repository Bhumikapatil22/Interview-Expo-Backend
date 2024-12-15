import questionsModel from '../models/questionsModel.js';
import companyModel from '../models/companyModel.js'; 
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const createQuestion = async (req, res) => {
  try {
    const { company, questions } = req.body;
    console.log({ company, questions });

    // Prepare the question data
    const questionData = Array.isArray(questions)
      ? questions.map((q) => ({
          company,
          question: q,
        }))
      : [{ company, question: questions }];

    // Save the questions
    const savedQuestions = await questionsModel.insertMany(questionData);

    // Update the company with the new question IDs
    const questionIds = savedQuestions.map((q) => q._id);
    await companyModel.findByIdAndUpdate(
      company,
      { $push: { question: { $each: questionIds } } },
      { new: true }
    );

    res.json({ message: "Questions added successfully", questions: savedQuestions });
  } catch (error) {
    console.error("Error while adding Question:", error);
    res.status(500).json({ message: "Error while adding Question", error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionsModel
      .find()
      .populate("company", "name"); // Populate company name

    return res.json({ questions });
  } catch (error) {
    console.error("Error while fetching questions:", error);
    return res.status(400).json({ error: "Error while fetching questions" });
  }
};

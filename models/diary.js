const { Schema, model } = require('mongoose');
const Joi = require('joi');


const diarySchema = Schema(
    {
    date: {
        type: String,
        require: [true, "Date is required"],
      },
    productList: [
        {
            weight: {
              type: Number,
            },
            title: {
              ru: {
                type: String,
              },
              ua: {
                type: String,
              },
            },
            calories: {
              type: Number,
            },
        }
    ],
    caloriesReceived: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false, timestamps: true }
  );

  const add = Joi.object({
    // date: Joi.date(),
    // productList: Joi.array[{
    //         weight: Joi.number().required(),
    // title: Joi.object({ ru: Joi.string(), ua: Joi.string() }),
    // calories: Joi.number().required(),
    // }],
    // caloriesReceived: Joi.number,
    // // owner: 
  });
  
  const schemas = {
    add,
  };
  
  const Dairy = model('diary', diarySchema);
  
  module.exports = {
    Dairy,
    schemas,
  };
import Joi from "joi";
// just object
// export const bookSchema = Joi.object({
//     isbn: Joi.string().required(),
//     title: Joi.string().required(),
//     subtitle: Joi.string().optional(),
//     author: Joi.string().required(),
//     published:Joi.date().required(),
//     publisher: Joi.string().required(),
//     pages: Joi.number().required(),
//     description: Joi.string().required(),
//     website: Joi.string().uri().required(),
// })

// with an array
export const bookSchema = Joi.array().items(Joi.object({
    isbn: Joi.string().required(),

    title: Joi.string().required(),

    category: Joi.string().optional(),

    author: Joi.string().required(),

    description: Joi.string().required(),

    imageURL: Joi.array().items(
        Joi.string()
        .uri())
        .min(1)
        .max(5)
        .required(),
}))
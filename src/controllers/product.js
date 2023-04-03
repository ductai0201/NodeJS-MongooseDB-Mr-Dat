import Joi from "joi";
import product from "../models/product";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
});

export const getAll = async (req, res) => {
  try {
    const data = await product.find();
    if (data.length == 0) {
      return res.json({
        messeage: "khong co san pham nao",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findById(id);
    if (data.length === 0) {
      return res.status(200).json({
        messeage: "khong co san pham",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await product.findByIdAndDelete(req.params.id)
    return res.json({
      messeage: "Da xoa thanh cong",
      data
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body);
    if (error) {
      return res.json({
        messeage: error.details[0].message,
      });
    }

    const data = await product.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        messeage: "them san pham that bai",
      });
    }
    return res.status(200).json({
      messeage: "Them thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = product.findByIdAndUpdate(id,req.body,{new: true})
    if (!data) {
      return res.status(400).json({
        messeage: "update san pham that bai",
      });
    }
    return res.status(200).json({
      messeage: "update thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};

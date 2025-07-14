const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { Product,Sales,Sale_Item } = require("../../models");
const { STATUS_CODES, TEXTS } = require("../../config/constants");

const create = asyncErrorHandler(async (req, res) => {
   const { business_id, items } = req.body;
   const user_id=req.params.id;

     for (let item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product || product.quantity < item.quantity) {
        return res.status(STATUS_CODES.CONFLICT).json({statusCode: STATUS_CODES.CONFLICT, message: TEXTS.REJECTED_REQUEST,  });
      }
    }

    const sale = await Sales.create({business_id,user_id});
    let total = 0;
    for (let item of items) {
      const product = await Product.findByPk(item.product_id);
      const subtotal = item.quantity * product.price;
      total += subtotal;

      await Sale_Item.create({sale_id: sale.id,product_id: product.id,
        quantity: item.quantity,
        price: product.price,
        sub_total: subtotal,
      });

      await product.update({ quantity: product.quantity - item.quantity });
    }

    await sale.update({ total_amount: total });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED
  });
});


const get = asyncErrorHandler(async (req, res) => {

  const  id  = req.params.id;
  const data=await Sales.findAndCountAll({
    where:{business_id:id},
    ...req.pagination,
    raw:true
  }

)
  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.FOUND,
    data: data,
  });

});



const del = asyncErrorHandler(async (req, res) => {

  const data = await Sales.destroy({
    where: {
      id: req.params.id
    }
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.DELETED,
    data: data,
  });

});





module.exports = {
  create,
  get,
  del
};

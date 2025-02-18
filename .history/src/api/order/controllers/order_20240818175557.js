"use strict";

//@ts-ignore
const stripe = require("stripe")(
  "sk_test_51PgS90HDUN3elk2GVFxPzOPyOdlxu72Diw9AMvDkouWGspClFhKvLkF7Op0GU2eSKv1wQqxbyP8QCxVKkfkxgKTn00puVUNxZx"
);

function calcDiscountPrice(price, discount) {
  if (!discount) return price;
  const discountAmount = (price * discount) / 100;
  const result = price - discountAmount;
  return result.toFixed(2);
}

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async paymentOrder(ctx) {
    //@ts-ignore

    const { token, products, idUser, addressShipping } = ctx.request.body;
    let totalPayment = 0;

    products.forEach((product) => {
      const priceTemp = calcDiscountPrice(
        product.attributes.price,
        product.attributes.discount
      );
      totalPayment += Number(priceTemp) * product.quantity;
    });

    const charge = await stripe.charges.create({
      amount: Math.round(totalPayment * 100),
      currency: "eur",
      source: token.id,
      description: `User ID: ${idUser}`,
    });

    const data = {
      products,
      user: idUser,
      totalPayment,
      idPayment: charge.id,
      addressShipping,
    };

    try {
      const entry = await strapi.db.query("api::order.order").create({ data });
      return entry;
    } catch (err) {
      ctx.throw(400, `Validation Error: ${err.message}`);
    }
  },
}));

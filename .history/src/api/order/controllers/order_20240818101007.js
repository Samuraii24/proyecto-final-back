"use strict";
const stripe = require("stripe")(
  "sk_test_51PgS90HDUN3elk2GVFxPzOPyOdlxu72Diw9AMvDkouWGspClFhKvLkF7Op0GU2eSKv1wQqxbyP8QCxVKkfkxgKTn00puVUNxZx"
);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async paymentOrder(ctx) {
    ctx.body = "Pago exitoso"
  }
})));

const express = require("express");
require("dotenv").config();
const { customer, plan, subscription, transaction, misc, subaccount, page } =
  require("paystack")(process.env.KEY);

const app = express();
app.use(express.json());

app.get("/customers", async (req, res) => {
  try {
    const response = await customer.list();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
app.get("/customers/:id", async (req, res) => {
  try {
    const response = await customer.get(req.params.id);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
app.post("/customers", async (req, res) => {
  try {
    const response = await customer.create({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});
app.post("/transactions", async (req, res) => {
  try {
    const response = await transaction.charge({
      amount: req.body.amount,
      email: req.body.email,
      reference: req.body.reference,
      authorization_code: req.body.authorization_code,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});
app.post("/transactions/init", async (req, res) => {
  try {
    const response = await transaction.initialize({
      amount: req.body.amount,
      reference: req.body.reference,
      email: req.body.email,
      name: req.body.name,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});
app.get("/transactions/:ref/verify", async (req, res) => {
  try {
    const response = await transaction.verify(req.params.ref);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});
app.post("/plans", async (req, res) => {
  try {
    const response = await plan.create({
      amount: req.body.amount,
      interval: req.body.interval,
      name: req.body.name,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});
app.post("/subscriptions", async (req, res) => {
  try {
    const response = await subscription.create({
      authorization: req.body.authorization,
      customer: req.body.customer,
      plan: req.body.plan,
      start_date: req.body.start_date,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});

app.listen(5500, () => {
  console.log("server is running");
});

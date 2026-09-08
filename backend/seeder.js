import dotenv from "dotenv";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import users from "./data/users.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    const createdProducts = await Product.insertMany(sampleProducts);

    // Regular (non-admin) users, used as the authors of reviews and orders.
    const customers = createdUsers.filter((u) => !u.isAdmin);

    // Add a few sample reviews to the first products so ratings aren't empty.
    const sampleComments = [
      {
        rating: 5,
        comment: "Excellent quality, exactly as described. Highly recommend!",
      },
      { rating: 4, comment: "Great value for the price. Fast delivery too." },
      {
        rating: 5,
        comment: "Works perfectly and looks premium. Very happy with it.",
      },
      {
        rating: 3,
        comment: "Decent product, does the job but nothing special.",
      },
    ];

    for (let idx = 0; idx < createdProducts.length; idx++) {
      const product = createdProducts[idx];
      // 1–3 reviews per product
      const reviewCount = (idx % 3) + 1;
      const reviews = [];
      for (let i = 0; i < reviewCount; i++) {
        const author = customers[i % customers.length];
        const sample = sampleComments[(idx + i) % sampleComments.length];
        reviews.push({
          name: author.name,
          rating: sample.rating,
          comment: sample.comment,
          user: author._id,
        });
      }
      product.reviews = reviews;
      product.numReviews = reviews.length;
      product.rating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await product.save();
    }

    // Create a few sample orders so the admin dashboard shows real data.
    const customer = customers[0]._id;
    const now = new Date();
    const daysAgo = (n) => {
      const d = new Date(now);
      d.setDate(d.getDate() - n);
      return d;
    };

    const sampleOrders = createdProducts.slice(0, 6).map((product, i) => {
      const quantity = (i % 3) + 1;
      const itemsPrice = product.price * quantity;
      const taxPrice = Number((itemsPrice * 0.15).toFixed(2));
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      const totalPrice = Number(
        (itemsPrice + taxPrice + shippingPrice).toFixed(2)
      );
      return {
        user: customer,
        orderItems: [
          {
            name: product.name,
            quantity,
            image: product.image,
            price: product.price,
            product: product._id,
          },
        ],
        shippingAddress: {
          address: "123 Demo Street",
          city: "Yerevan",
          postalCode: 375000,
          country: "Armenia",
        },
        paymentMethod: "PayPal",
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true,
        paidAt: daysAgo(i),
        isDelivered: i % 2 === 0,
        deliveredAt: i % 2 === 0 ? daysAgo(i) : undefined,
        createdAt: daysAgo(i),
      };
    });

    await Order.insertMany(sampleOrders);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

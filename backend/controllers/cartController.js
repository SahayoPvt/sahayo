import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const createCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity, size = 'M' } = req.body; // Default size 'M' if not provided
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }
        // Find user's cart
        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            // Check if product already exists in cart
            const existingProductIndex = cart.products.findIndex(
                item => item.product.toString() === productId.toString() && item.size === size
            );

            if (existingProductIndex > -1) {
                // Product exists - update quantity and price
                cart.products[existingProductIndex].quantity += quantity;
                cart.products[existingProductIndex].price = product.currentprice * cart.products[existingProductIndex].quantity;
            } else {
                // Product doesn't exist - add new item
                cart.products.push({
                    product: productId,
                    name: product.name,
                    price: product.currentprice * quantity,
                    quantity: quantity,
                    image: product.image[0].url,
                    size: size
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce((total, item) => total + item.price, 0);
        } else {
            // Create new cart
            const price = product.currentprice * quantity;
            cart = new Cart({
                user: userId,
                products: [{
                    product: productId,
                    name: product.name,
                    price: price,
                    quantity: quantity,
                    image: product.image[0].url,
                    size: size
                }],
                totalPrice: price
            });
        }

        await cart.save();

        res.status(200).json({ success: true, message:"Product Added To Cart",cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
// Fix getCartByUser
export const getCartByUser = async (req, res) => {
   try {
       const cart = await Cart.findOne({user: req.user._id}).populate('products.product');
       if (!cart) {
           return res.status(200).json({ success: true, cart: { products: [], totalPrice: 0 } });
       }
       res.status(200).json({ success: true, cart });

   } catch (error) {
       console.error(error);
       res.status(500).json({ success: false, message: "Server Error" });
   }
};

// Remove the insecure getCart endpoint or add admin protection
export const getCart = async (req, res) => {
   try {
       const carts = await Cart.find().populate('user').populate('products.product');
       res.status(200).json({ success: true, carts });
   } catch (error) {
       res.status(500).json({ success: false, message: "Server Error" });
   }
};



// today

export const incrementCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId} = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId 
    //   && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not in cart" });
    }

    // Increase quantity
    cart.products[itemIndex].quantity += 1;
    cart.products[itemIndex].price = product.currentprice * cart.products[itemIndex].quantity;

    // Recalculate total cart price
    cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price, 0);

    await cart.save();
    res.status(200).json({ success: true, message: "Quantity increased", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const decrementCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId} = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId 
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    // Reduce quantity or remove if 1
    if (cart.products[itemIndex].quantity > 1) {
      cart.products[itemIndex].quantity -= 1;
      cart.products[itemIndex].price = product.currentprice * cart.products[itemIndex].quantity;
    } else {
      cart.products.splice(itemIndex, 1); // Remove item
    }

    cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price, 0);
    await cart.save();

    res.status(200).json({ success: true, message: "Quantity updated", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { productId} = req.body; // ✅ Extract size
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    // ✅ Filter out the matching item by productId and size
    cart.products = cart.products.filter(
      (item) => !(item.product.toString() === productId)
    );

    // ✅ Recalculate total price
    cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await cart.save();

    res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (err) {
    console.error(err); // Optional: for debugging
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


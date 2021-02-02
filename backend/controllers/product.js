const Product = require('../models/product');

const controller = {
   
    newproduct: async (req, res) => {
     try {
     const product = new Product (req.body);
      await product.save();
      res.status(200).json({
          message: 'Producto creado correctamente.',
          obj: product
      });
     } catch (err) {
         console.log(err);
         res.status(500).json({
             error: err
         });
     }
    },

    getproducts: async (req, res) => {
        try {
            const allproducts = await Product.find();
            res.status(200).json({
                count: allproducts.length,
                obj: allproducts
            });

        } catch (err) {
            console.log(err);
            res.status(500);
        }

    },
    
    updateproduct: async (req, res) => {
        try {
          const { name, category, location, price } = req.body; // Destructuro propiedades que el usuario ingresó y llegó al body
          let product = await Product.findById(req.params.id); // Búsqueda por id 
          
          if(!product) { // Si el id no existe
              res.status(404).json({message: 'Producto no encontrado.'});
          }
          // Reemplazo y actualización de datos
          product.name = name;
          product.category = category;
          product.location = location;
          product.price = price;
          
          product = await Product.findByIdAndUpdate({_id: req.params.id}, product, {new: true}); // El método recibe 3 parametros, el id, el objeto actualizado y new en true
          res.status(200).json({
              message: 'Producto actualizado correctamente.',
              obj: product
          });
        } catch (err) {
             console.log(err);
             res.status(500);  
        }
    },

    getoneproduct: async (req,res) => {
        try {
            let product = await Product.findById(req.params.id);
            if (!product) {
            res.status(404).json({message: 'Producto no encontrado.'})
            }
            res.status(200).json({obj: product}); 
        } catch (err) {
            console.log(err);
            res.status(500);
        }
        

    },

    deleteproduct: async (req,res) => {
        try {
            let product = await Product.findByIdAndRemove(req.params.id);
            if (!product) {
            res.status(404).json({message: 'Producto no encontrado.'})
            }
            res.status(200).json({message: 'Producto eliminado correctamente.'}); 
        } catch (err) {
            console.log(err);
            res.status(500);
        }
        

    }

}

module.exports = controller;
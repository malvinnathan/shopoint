var mongoose = require("mongoose");

var storeSchema = new mongoose.Schema({

        id: String,
        storename: String,
        logo_link: String,
        product1: String,
        p1_alt: String,
        product2: String,
        p2_alt: String,
        product3: String,
        p3_alt: String,
        product4: String,
        p4_alt: String,
        discount: String,
        store_addr: String

});

var Store = mongoose.model("store",storeSchema,"store");

module.exports = Store;





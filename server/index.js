const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const KursModel = require("./models/kurs");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb://localhost:27017/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.post("/insert", async (req, res) => {
    const kursName = req.body.kursName;
    const kursPrice = req.body.kursPrice;
    const kursAuthor = req.body.kursAuthor;
    const kursCategory = req.body.kursCategory
    const kurs = new KursModel({kursName: kursName, kursPrice: kursPrice, kursAuthor: kursAuthor, kursCategory: kursCategory});

    try {
        await kurs.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
});

app.get("/read", async (req, res) => {
    // FoodModel.find({$where: {foodName:  "Apple"}}, )
    KursModel.find({}, (err, results) => {
        if (err) {
            res.send(err);
        }

        res.send(results);
    });
});

app.put("/update", async (req, res) => {
    const id = req.body.id;
    const kursName = req.body.kursName;
    const kursAuthor = req.body.kursAuthor;
    const kursPrice = req.body.kursPrice;
    const kursCategory = req.body.kursCategory;
    try {
        await KursModel.findById(id, (err, updateKurs) => {
            updateKurs.KURSName = kursName;
            updateKurs.KURSAuthor = kursAuthor;
            updateKurs.KURSPrice = kursPrice;
            updateKurs.KURSCategory = kursCategory;
            updateKurs.save();
            res.send("updated");
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await KursModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3004, () => {
    console.log("server runnig on port 3004");
});

const express = require("express");
const mongoose = require("mongoose");
const Subject = require("./models/Subject");

const PORT = 8000;

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/subjects").then(() => {
    console.log("Успешное подключение к БД!");
}).catch((error) => {
    console.error(`Ошибка при подключении к БД: ${error}`);
})

app.get("/subjects", async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        console.error(`Ошибка при получении предметов: ${error}`);
        res.send("Ошибка при получении предметов!");
    }
})

app.get("/subjects/:id", async (req, res) => {
    try {
        const { id } = req.params
        const subject = await Subject.findById(id);
        res.json(subject);
    } catch (error) {
        console.error(`Ошибка при получении предмета: ${error}`);
        res.send("Ошибка при получении предмета!");
    }
})

app.post("/subjects/add", async (req, res) => {
    const { title, description, teacher, schedule } = req.body;
    try {
        const newSubject = await Subject.create({
            title,
            description,
            teacher,
            schedule
        });
        await newSubject.save();

        res.send("Предмет успешно добавлен!");
    } catch (error) {
        удалении
        res.send("Ошибка при добавлении предмета!");
    }
})

app.put("/subjects/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, teacher, schedule } = req.body;
    try {
        const updateSubjects = await Subject.findByIdAndUpdate(id, {
            title, 
            description,
            teacher,
            schedule
        });

        if (!updateSubjects) {
            res.send("Такого предмета не существует!");
        }

        res.send("Предмет успешно обновлён!");
    } catch (error) {
        console.error(`Ошибка при обновлении предмета: ${error}`);
        res.send("Ошибка при обновлении предмета!");
    }
})

app.patch("/subjects/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateSubject = await Subject.findByIdAndUpdate(id, { $set: req.body });

        if (!updateSubject) {
            res.send("Такого предмета не существует!");
        }

        res.send("Предмет успешно обновлён!");
    } catch (error) {
        console.error(`Ошибка при обновлении предмета: ${error}`);
        res.send("Ошибка при обновлении предмета!");
    }
})

app.delete("/subjects/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSubject = Subject.findByIdAndDelete(id);

        if (!deleteSubject) {
            res.send("Такого предмета не существует!");
        }

        res.send("Предмет успешно удалён!");
    } catch (error) {
        console.error(`Ошибка при удалении предмета: ${error}`);
        res.send("Ошибка при удалении предмета!");
    }
})

app.listen(PORT, () => {
    console.log(`Успешное подключение к серверу на порту ${PORT}`);
})
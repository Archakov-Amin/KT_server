const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Название предмета не заполнено!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Описание предмета не заполнено!"]
    },
    teacher: {
        type: String,
        required: [true, "Имя преподавателя не указано!"],
        trim: true
    },
    schedule: {
        type: String,
        required: [true, "Расписание предмета не указано!"],
        trim: true
    }
});

module.exports = mongoose.model("Subject", subjectSchema);
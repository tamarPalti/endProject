const Tasks = require("../models/Tasks");
const TypeTsks = require("../models/TypeTasks");
const getAllTypeTsks = async (req, res) => {
    try {
        let AllTypeTsks = await TypeTsks.find();
        return res.send(AllTypeTsks);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const getAllTask = async (req, res) => {
    try {
        let AllTask = await Tasks.find().populate(
            [{ path: "codeUser", select: "firstName lastName phoneNamber adress email" },
            { path: "otherUser", select: "firstName lastName phoneNamber adress email" }
                , { path: "type", select: "name" },
                { path: "otherbuisness", select: "name phoneNamber adress email" }]);
        return res.send(AllTask);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const addTypeTsks = async (req, res) => {
    let newTypeTsks = new TypeTsks(req.body);
    try {
        await newTypeTsks.save();
        return res.send(newTypeTsks);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const addTask = async (req, res) => {
    let newTask = new Tasks(req.body);
    try {
        await newTask.save();
        return res.send(newTask);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const updateTask = async (req, res) => {
    let TaskBody = req.body;
    const id = req.params.id;
    try {
        const task = await Tasks.findOne({ "_id": id });
        if (!task)
            return res.status(404).send("sorry no such task");
        task.status = TaskBody.status || task.status;
        task.desription = TaskBody.desription || task.desription;
        task.type = TaskBody.type || task.type;
        task.date = TaskBody.date || task.date;
        await task.save();
        return res.send(task);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }

}
const updateTypeTask = async (req, res) => {
    let typeTaskBody = req.body;
    const id = req.params.id;
    try {
        const typeTask = await TypeTsks.findOne({ "_id": id });
        if (!typeTask)
            return res.status(404).send("sorry no such task");
        typeTask.name = typeTaskBody.name || typeTask.name;
        typeTask.code = typeTaskBody.code || typeTask.code;
        await typeTask.save();
        return res.send(typeTask);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }

}
const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Tasks.findOneAndDelete({ "_id": id });
        if (!task)
            return res.status(404).send("sorry no such user");
        return res.send(task).status();
    }
    catch{
        return res.status(400);

    }

}

module.exports = {
    getAllTypeTsks, getAllTask, addTypeTsks, addTask, deleteTask, updateTask, updateTypeTask
}
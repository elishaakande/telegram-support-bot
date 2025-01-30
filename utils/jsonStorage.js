const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/faq.json");

const loadData = () => {
  try {
    console.log(filePath);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return [];
  }
};

const saveData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

module.exports = { loadData, saveData };

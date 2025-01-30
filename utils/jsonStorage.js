const fs = require("fs");
const filePath = "./data/faq.json";

const loadData = () => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return [];
  }
};

const saveData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

module.exports = { loadData, saveData };

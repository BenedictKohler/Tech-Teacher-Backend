class Utils {

    convertToJsonList(result) {
        let res = [];
        for (var row of result) {
            let item = {};
            for (var obj of row) item[obj.metadata.colName] = obj.value;
            res.push(item);
        }
        return res;
    }

}

module.exports = new Utils();

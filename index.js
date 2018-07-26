const fs = require("fs"),
      readLine = require('readline'),
      com = require("commander"),
      excel = require("exceljs");

const method = /[\s\t]+(\w*)(?=\:\s+function\s?\(\D*\)\s?\{[\n|\s*])/,
      endBraket = /[\s\t]+\}\,\s*\n/,
      prop = /[\s\t]+(\w*)(?=\s?:)/;

class work {
    constructor(name) {
        this.name = name;
        this.workbook = new excel.Workbook();
        this.worksheet = workbook.addWorksheet(name);
    }

    addRow(data) {
        this.worksheet.addRow([data]);
    }

    writeFile() {
        workbook.xlsx.writeFile(this.name + ".xlsx");
    }
}

com
    .version("0.0.1")
    .command("path [path]")
    .action(function(path, cmd) {
        const lineReader = readLine.createInterface({
            input: fs.createReadStream(path)
        });
        
        const workbookHelper = new work("list");

        let isInsideFunc = false;

        lineReader.on("line", function (line) {
            var isFunc = line.match(method);

            if (isFunc && !isInsideFunc) {
                if (!line.match(endBraket)) isInsideFunc = true;
                workbookHelper.addRow(isFunc);
                return;
            }
            
            if (!isInsideFunc){
                var isProp = line.match(prop);
                if (isProp) {
                    worksheet.addRow(isProp[1]);
                }
                return;
            }
            
            if (isInsideFunc) {
                if (line.match(endBraket)) isInsideFunc = false;
            }            
            
        });
        
        lineReader.on("close", function() {
            workbookHelper.writeFile();
        });
        
    });

com
    .parse(process.argv);


var numX = 4
var start = parseInt("0010")
var end = parseInt("0200")



for (var i = start; start <= end; start++) {
    console.log(start.toString().padStart(numX, "0"))
    // 'abc'.padStart(numX, "0");
}
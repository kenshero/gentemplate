var myCanvas = document.getElementById("myCanvas")
var myContext = myCanvas.getContext("2d")
// document.getElementById("mytext").value = "My value"
// var titleBox = document.getElementById("titleBox")
// var colorBox = document.getElementById("colorBox")
var fontColorBox = document.getElementById("fontColorBox")
var fontSizeBox = document.getElementById("fontSizeBox")
var firstTxtBox = document.getElementById("firstTxtBox")
var numTxtBox = document.getElementById("numTxtBox")
var startNumBox = document.getElementById("startNumBox")
var startEndBox = document.getElementById("startEndBox")
var widthBox = document.getElementById("widthBox")
var heightBox = document.getElementById("heightBox")
var posXBox = document.getElementById("posXBox")
var posYBox = document.getElementById("posYBox")
var vdoWidthBox = document.getElementById("vdoWidthBox")
var vdoHeightBox = document.getElementById("vdoHeightBox")
var genMockBtn = document.getElementById("genMockBtn")
var addTextBtn = document.getElementById("addTextBtn")

var mouseIsDown, txtPosX = 10, txtPosY = 50

myCanvas.addEventListener("mousedown", mouseDown, false);
myCanvas.addEventListener("mousemove", mouseXY, false);
document.body.addEventListener("mouseup", mouseUp, false);

init_template()


function init_template() {
    fontColorBox.value = "#ffffff"
    myCanvas.setAttribute('width', 3840)
    myCanvas.setAttribute('height', 2160)
    myContext.fillStyle = "#ddd"
    myContext.fillRect(0, 0, myCanvas.width, myCanvas.height)
    document.getElementById("genMockBtn").disabled = true
}

function getName() {
    return titleBox.value
}

function getBGColor() {
    return colorBox.value
}

function getFontColorBox() {
    return fontColorBox.value
}

function getFontSize() {
    return fontSizeBox.value
}

function getFirstTxtBox() {
    return firstTxtBox.value
}

function getNumTxt() {
    return numTxtBox.value
}

function getStartNum() {
    return startNumBox.value
}

function getStartEnd() {
    return startEndBox.value
}

function getWidthBox() {
    return widthBox.value
}

function getHeightBox() {
    return heightBox.value
}

function getPosXBox() {
    return posXBox.value
}

function getPosYBox() {
    return posYBox.value
}

function getVdoWidthBox() {
    return vdoWidthBox.value
}

function getVdoHeightBox() {
    return vdoHeightBox.value
}

function setWidthBox() {
    var width = getWidthBox()
    myCanvas.setAttribute('width', width)
}

function setHeightBox() {
    var height = getHeightBox()
    myCanvas.setAttribute('height', height)
}

function getShotTitle(shotNumber) {
    var firstText = getFirstTxtBox()
    var shotTitle = `${firstText}${shotNumber}`
    return shotTitle
}

function drawLineVdo() {
    var vdoPosX = getVdoWidthBox()
    var vdoPosY = getVdoHeightBox()
    var height = getHeightBox()
    var distanceVdoLine = (height - vdoPosY) /2
    myContext.beginPath()
    myContext.moveTo(0, distanceVdoLine)
    myContext.lineTo(vdoPosX, distanceVdoLine)

    myContext.moveTo(0, height - distanceVdoLine)
    myContext.lineTo(vdoPosX, height - distanceVdoLine)
    myContext.lineWidth = 1
    myContext.strokeStyle = '#ff0000'
    myContext.stroke()
}

function previewText(shotTitle) {
    myContext.clearRect(0, 0, myCanvas.width, myCanvas.height)
    // var bgColor = getBGColor()

    myContext.fillStyle = "#ddd"
    myContext.fillRect(0, 0, myCanvas.width, myCanvas.height)

    drawLineVdo()
    // var title = getName()
    var fontSize = getFontSize()
    var fontColor = getFontColorBox()
    myContext.font = `${fontSize}px Comic Sans MS`
    myContext.fillStyle = fontColor
    myContext.fillText(shotTitle, txtPosX, txtPosY)
}

function genTemplateShot(shotTitle) {
    myContext.clearRect(0, 0, myCanvas.width, myCanvas.height)
    myContext.fillStyle = 'rgba(0,0,0,0)';
    myContext.fillRect(0, 0, myCanvas.width, myCanvas.height)

    // var title = getName()
    var fontSize = getFontSize()
    var fontColor = getFontColorBox()
    myContext.font = `${fontSize}px Comic Sans MS`
    myContext.fillStyle = fontColor
    myContext.fillText(shotTitle, txtPosX, txtPosY)
}

function checkValidate() {
    // var title = getName()
    // var color = getBGColor()
    var fontColor = getFontColorBox()
    var fontSize = getFontSize()
    var firstText = getFirstTxtBox()
    var numTxt = getNumTxt()
    var startNum = getStartNum()
    var startEnd = getStartEnd()
    var width = getWidthBox()
    var height = getHeightBox()
    if (!fontColor || !fontSize || !firstText || !numTxt || !startNum || !startEnd || !width || !height) {
        return false
    }
    return true
}

function generateMockShot() {
    console.log("mock ...")
    // download(myCanvas, 'myimage.png');
    var start = parseInt(getStartNum())
    var end = parseInt(getStartEnd())
    var numX = parseInt(getNumTxt())
    // var count = 0
    var zip = new JSZip();
    var zipFolder = zip.folder("images");

    for (var i = start; start <= end; start++) {
        // console.log(start.toString().padStart(numX, "0"))
        var shotNumber = start.toString().padStart(numX, "0")
        var savable = new Image();
        var shotTitle = getShotTitle(shotNumber)
        genTemplateShot(shotTitle)
        savable.src = myCanvas.toDataURL();
        zipFolder.file(`${shotNumber}.png`, savable.src.substr(savable.src.indexOf(',') + 1), {base64: true});
        if (start == end) {
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, "template_shots.zip")
                // console.log("end load")
                // genMockBtn.classList.remove("is-loading")
            });
        }
    }
}

// function download(canvas, filename) {
//   var lnk = document.createElement('a'), e;
//   lnk.download = filename;
//   lnk.href = canvas.toDataURL("image/png;base64");

//   if (document.createEvent) {
//     e = document.createEvent("MouseEvents");
//     e.initMouseEvent("click", true, true, window,
//                      0, 0, 0, 0, 0, false, false, false,
//                      false, 0, null);

//     lnk.dispatchEvent(e);
//   } else if (lnk.fireEvent) {
//     lnk.fireEvent("onclick");
//   }
// }

addTextBtn.addEventListener('click', () => {
    var isValid = checkValidate()
    if (isValid) {
        var startNum = getStartNum()
        var shotTitle = getShotTitle(startNum)
        previewText(shotTitle)
        document.getElementById("error-message").style.display = 'none'
        document.getElementById("genMockBtn").disabled = false
    } else {
        document.getElementById("error-message").style.display = 'block'
    }
});

genMockBtn.addEventListener('click', () => {
    // genMockBtn.className += " is-loading"
    generateMockShot()
});

widthBox.addEventListener('change', () => {
    setWidthBox()
});

heightBox.addEventListener('change', () => {
    setHeightBox()
});

posXBox.addEventListener('change', () => {
    changePos()
});

posYBox.addEventListener('change', () => {
    changePos()
});

// var testLoad = document.getElementById("testLoad")
// testLoad.addEventListener('click', () => {
//     testLoad.className += " is-loading"
//     console.log("ssssssssssssssss")
// });

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function mouseUp() {
    mouseIsDown = 0;
    mouseXY();
}

function mouseDown() {
    mouseIsDown = 1;
    mouseXY();
}

function mouseXY(e) {
    ShowPos(e);
}

function ShowPos(e) {
    if(mouseIsDown) {
        posXBox.value = txtPosX
        posYBox.value = txtPosY
        var mousePos = getMousePos(myCanvas, e);
        txtPosX = mousePos.x
        txtPosY = mousePos.y

        var startNum = getStartNum()
        var shotTitle = getShotTitle(startNum)
        previewText(shotTitle);
    }
}

function changePos() {
    txtPosX = getPosXBox()
    txtPosY = getPosYBox()
    var startNum = getStartNum()
    var shotTitle = getShotTitle(startNum)
    previewText(shotTitle)
}

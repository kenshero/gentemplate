var myCanvas = document.getElementById("myCanvas")
var myContext = myCanvas.getContext("2d")
// document.getElementById("mytext").value = "My value"
var titleBox = document.getElementById("titleBox")
var colorBox = document.getElementById("colorBox")
var fontColorBox = document.getElementById("fontColorBox")
var fontSizeBox = document.getElementById("fontSizeBox")
var firstTxtBox = document.getElementById("firstTxtBox")
var numTxtBox = document.getElementById("numTxtBox")
var startNumBox = document.getElementById("startNumBox")
var startEndBox = document.getElementById("startEndBox")
var widthBox = document.getElementById("widthBox")
var heightBox = document.getElementById("heightBox")
var mouseIsDown, txtPosX = 10, txtPosY = 50

myCanvas.addEventListener("mousedown", mouseDown, false);
myCanvas.addEventListener("mousemove", mouseXY, false);
document.body.addEventListener("mouseup", mouseUp, false);

init_template()


function init_template() {
    fontColorBox.value = "#ffffff"
    myCanvas.style.width = "3840px"
    myCanvas.style.height = "2160px"
    myContext.fillStyle = "black"
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

function setWidthBox() {
    var width = getWidthBox()
    myCanvas.style.width = `${width}px`
}

function setHeightBox() {
    var height = getHeightBox()
    myCanvas.style.height = `${height}px`
}

function addText() {
    myContext.clearRect(0, 0, myCanvas.width, myCanvas.height)
    var bgColor = getBGColor()

    myContext.fillStyle = bgColor
    myContext.fillRect(0, 0, myCanvas.width, myCanvas.height)

    var title = getName()
    var fontSize = getFontSize()
    var fontColor = getFontColorBox()
    myContext.font = `${fontSize}px Comic Sans MS`
    myContext.fillStyle = fontColor
    myContext.fillText(title, txtPosX, txtPosY)
}

function checkValidate() {
    var title = getName()
    var color = getBGColor()
    var fontColor = getFontColorBox()
    var fontSize = getFontSize()
    var firstText = getFirstTxtBox()
    var numTxt = getNumTxt()
    var startNum = getStartNum()
    var startEnd = getStartEnd()
    var width = getWidthBox()
    var height = getHeightBox()
    if (!title || !color || !fontColor || !fontSize || !firstText || !numTxt || !startNum || !startEnd || !width || !height) {
        return false
    }
    return true
}

function generateMockShot() {
    console.log("mock ...")
    // download(myCanvas, 'myimage.png');

    var imgData = myCanvas.toDataURL("image/png;base64");
    var zip = new JSZip();
    var img = zip.folder("images");
    img.file("smile.png", imgData);
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
    });

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
        addText()
        document.getElementById("error-message").style.display = 'none'
        document.getElementById("genMockBtn").disabled = false
    } else {
        document.getElementById("error-message").style.display = 'block'
    }
});

genMockBtn.addEventListener('click', () => {
    generateMockShot()
});

widthBox.addEventListener('change', () => {
    setWidthBox()
});

heightBox.addEventListener('change', () => {
    setHeightBox()
});

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
    e.preventDefault()
    var mousePos = getMousePos(myCanvas, e);
    txtPosX = mousePos.x
    txtPosY = mousePos.y

    ShowPos();
}

function ShowPos() {
    if(mouseIsDown) {
        addText();
    }
}

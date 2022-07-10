const { jsPDF } = window.jspdf;

const changeSize = (elementId) => {
    const elementValueDisplayId = elementId + "SizeValue";
    return (element) => {
        const fontSize = element.target.value + "px"
        document.getElementById(elementId).style.fontSize = fontSize;
        document.getElementById(elementValueDisplayId).innerHTML = fontSize;
    }
}

const changeBold = (elementId) => {
    return (element) => {
        const fontWeight = element.target.checked ? "bold" : "normal";
        document.getElementById(elementId).style.fontWeight = fontWeight;
    }
}

const changeValue = (elementId) => {
    const inputId = elementId + "Value";
    return (element) => {
        const text = element.target.value;
        document.getElementById(elementId).innerHTML = text;
    }
}


const textModifier = (elementId) => {
    const inputId = elementId + "Value";
    const sliderId = elementId + "Size";
    const boldId = elementId + "Bold";

    document.getElementById(inputId).addEventListener('input', changeValue(elementId));
    document.getElementById(sliderId).addEventListener('input', changeSize(elementId));
    document.getElementById(boldId).addEventListener('input', changeBold(elementId));
}

textModifier("name");
textModifier("title");

function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}


window.printPdf = () => {
    const printBtn = document.getElementById("print");

    if (printBtn.innerText === "Loading...") {
        console.log("Already printing");
        return;
    }

    printBtn.innerText = "Loading..."

    const name = document.getElementById("name").innerHTML;
    const title = document.getElementById("title").innerHTML;
    const filename = string_to_slug(name + "-" + title) + ".pdf";

    const pdf = new jsPDF('l', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    html2canvas(document.getElementById('preview'), {
        scale: 3
    }).then(canvas => {

        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'PNG', 0, 0, width, height);
        pdf.save(filename);
        printBtn.innerText = "Print PDF"
    })
}

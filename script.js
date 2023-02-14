function saveToPDF() {
  var pdf = new jsPDF('l', 'pt', 'a4');
  var button = document.querySelector('button[onclick="saveToPDF()"]');
  var excludeElement = document.createElement('div');
  excludeElement.appendChild(button);
  pdf.addHTML(document.body, function () {
    pdf.deletePage(1); // Remove the page with the button
    pdf.addPage();
    pdf.addHTML(document.body, function () {
      var link = document.createElement("a");
      link.download = "Cat Owner Certificate.pdf";
      link.href = pdf.output('datauristring');
      link.click();
    });
  }, function (element) {
    if (element === button) {
      return false;
    }
    return true;
  });
}


window.onload = function () {
  function displayFormData() {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const numberInput = document.querySelector("#number");
    const dropdownInput = document.querySelector("#dropdown");
    const spaceInput = document.querySelector('input[name="space"]:checked');
    const optInputs = document.querySelectorAll('input[name="opt"]:checked');
    const likesInput = document.querySelector("#likes");

    const name = nameInput.value;
    const email = emailInput.value;
    const number = numberInput.value;
    const dropdown = dropdownInput.value;
    const space = spaceInput.value;
    const opt = Array.from(optInputs).map(checkbox => checkbox.value);
    const likes = likesInput.value;

    fetch("form-data.html")
      .then(response => response.text())
      .then(data => {
        const formDataDisplay = `${data}`.replace("${name}", name)
          .replace("${email}", email)
          .replace("${number}", number)
          .replace("${dropdown}", dropdown)
          .replace("${space}", space)
          .replace("${opt.join(', ')}", opt.join(", "))
          .replace("${likes}", likes);

        const newWindow = window.open("", "", "width=1009, height=755");
        newWindow.document.write(formDataDisplay);
      })
      .catch(error => console.error(error));
  }

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    displayFormData();
  });
}



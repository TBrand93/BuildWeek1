document.addEventListener("DOMContentLoaded", function () {
  // Rileva il checkbox e il bottone PROCEED
  var checkbox = document.getElementById("myCheckbox");
  var proceedButton = document.querySelector(".btn");

  // Aggiungi un gestore di eventi per il click sul bottone
  proceedButton.addEventListener("click", function () {
    // Controlla se il checkbox è selezionato
    if (checkbox.checked) {
      // Se il checkbox è selezionato, il link ti porterà a pagina2.html
      window.location.href = "/pag 2-3/PAG2_3.html";
    } else {
      // Se il checkbox non è selezionato, mostra un avviso
      alert("Devi selezionare la casella di controllo per procedere.");
    }
  });
});

document.querySelector('#search-input').addEventListener('input', filterList);
if (window.location.pathname.includes()) {
  // Si la URL contiene "pagina1.html", elimina el botón

}
function filterList() {
  const searchInput = document.querySelector('#search-input');
  const filter = searchInput.value.toLowerCase();
  const listItems = document.querySelectorAll('.list-group-item');
  listItems.forEach((item) => {
    let text = item.textContent;
    if (text.toLowerCase().includes(filter.toLowerCase())) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

(function() {
  document.getElementById('logout').addEventListener('click', function(){
    postLogout();
  });
})();

function postLogout() {
  fetch('/admin/logout', {
    method: 'POST',
  }).then(resp => resp.json())
  .then((resp) => {
    window.location.href = resp.redirect;
  });
}
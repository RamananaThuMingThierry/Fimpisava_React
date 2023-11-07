
const ToggleBodyClass = (e) => {
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
   e.preventDefault();
  document.body.classList.toggle('sb-sidenav-toggled');
  localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
  }
};

export default ToggleBodyClass;
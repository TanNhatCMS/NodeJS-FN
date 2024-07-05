/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2024 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        //     sidebarToggle.querySelector('i').classList.toggle('fa-caret-square-o-left');
        //     sidebarToggle.querySelector('i').classList.toggle('fa-caret-square-o-right');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            const icon = sidebarToggle.querySelector('i');
            if (document.body.classList.contains('sb-sidenav-toggled')) {
                icon.classList.remove('fa-toggle-on');
                icon.classList.add('fa-toggle-off');
            } else {
                icon.classList.remove('fa-toggle-off');
                icon.classList.add('fa-toggle-on');
            }
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

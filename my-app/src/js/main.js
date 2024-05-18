import '../scss/styles.scss'

import * as bootstrap from 'bootstrap'

import { createClient } from '@supabase/supabase-js'

import { setRouter } from '../router/router';


setRouter();


const supabase = createClient('https://xhfezetmnqhvulnqwles.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZmV6ZXRtbnFodnVsbnF3bGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNjA1ODUsImV4cCI6MjAyODczNjU4NX0.bouFbolGc2M4q2v0FCoEzeVAzcUKrbImuLB92wDyQMs');


async function doLogout() {
    // Supabase Logout
    let { error } = await supabase.auth.signOut();

    if (error == null) {
      alert("Logout Successfully!");
  
      // Clear local Storage
      localStorage.clear();
  
      // Redirect to login page
      window.location.pathname = "/index.html";
    } else {
      alert("Logout Failed!");
    }
  }


 

  // Success Notification
function successNotification(message, seconds = 0) {
  document.querySelector(".alert-success").classList.remove("d-none");
  document.querySelector(".alert-success").classList.add("d-block");
  document.querySelector(".alert-success").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-success").classList.remove("d-block");
      document.querySelector(".alert-success").classList.add("d-none");
    }, seconds * 1000);
  }
}

// Error Notification
function errorNotification(message, seconds = 0) {
  document.querySelector(".alert-danger").classList.remove("d-none");
  document.querySelector(".alert-danger").classList.add("d-block");
  document.querySelector(".alert-danger").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-danger").classList.remove("d-block");
      document.querySelector(".alert-danger").classList.add("d-none");
    }, seconds * 1000);
  }
}
export { supabase, successNotification, errorNotification,doLogout };
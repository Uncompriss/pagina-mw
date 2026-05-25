const availableTimes = ["08:00", "09:00", "10:00", "11:00", "15:00", "16:00", "17:00"];
const storageKey = "mw-automotriz-citas";

const state = {
  selectedTime: "",
  appointments: JSON.parse(localStorage.getItem(storageKey) || "[]")
};

function saveAppointments() {
  localStorage.setItem(storageKey, JSON.stringify(state.appointments));
}

function dateKey(date, time) {
  return `${date} ${time}`;
}

function setMinimumDate() {
  const dateInput = document.querySelector("#bookingDate");
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

function renderTimeSlots() {
  const grid = document.querySelector("#timeGrid");
  const dateInput = document.querySelector("#bookingDate");
  if (!grid || !dateInput) return;

  const selectedDate = dateInput.value;
  grid.innerHTML = "";
  state.selectedTime = "";

  availableTimes.forEach((time) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "time-slot";
    button.textContent = time;
    button.disabled = !selectedDate || state.appointments.some((item) => item.dateTime === dateKey(selectedDate, time));

    button.addEventListener("click", () => {
      document.querySelectorAll(".time-slot").forEach((slot) => slot.classList.remove("active"));
      button.classList.add("active");
      state.selectedTime = time;
      document.querySelector("#selectedDateTime").value = dateKey(selectedDate, time);
    });

    grid.appendChild(button);
  });
}

function setupBookingForm() {
  const form = document.querySelector("#bookingForm");
  const dateInput = document.querySelector("#bookingDate");
  const status = document.querySelector("#formStatus");
  if (!form || !dateInput || !status) return;

  setMinimumDate();
  renderTimeSlots();
  dateInput.addEventListener("change", renderTimeSlots);

  form.addEventListener("submit", (event) => {
    const selectedDate = dateInput.value;
    const chosen = selectedDate && state.selectedTime ? dateKey(selectedDate, state.selectedTime) : "";

    if (!chosen) {
      event.preventDefault();
      status.textContent = "Selecciona un día y una hora disponible.";
      return;
    }

    if (state.appointments.some((item) => item.dateTime === chosen)) {
      event.preventDefault();
      status.textContent = "Ese horario acaba de quedar ocupado. Elige otra hora.";
      renderTimeSlots();
      return;
    }

    state.appointments.push({
      dateTime: chosen,
      createdAt: new Date().toISOString()
    });
    saveAppointments();
    document.querySelector("#selectedDateTime").value = chosen;
    status.textContent = "Solicitud registrada. Se abrirá el envío al correo de MW Automotriz.";
  });
}

function setupHeader() {
  const header = document.querySelector("[data-elevate]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  const toggleHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 18);
  };

  toggleHeader();
  window.addEventListener("scroll", toggleHeader, { passive: true });

  menuButton?.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileNav.classList.remove("open"));
  });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  elements.forEach((element) => observer.observe(element));
}

function setupGallery() {
  const dialog = document.querySelector("#lightbox");
  const image = document.querySelector("#lightboxImage");
  const close = document.querySelector("[data-close-lightbox]");

  document.querySelectorAll("[data-gallery]").forEach((item) => {
    item.addEventListener("click", () => {
      image.src = item.dataset.gallery;
      dialog.showModal();
    });
  });

  close?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupBookingForm();
  setupRevealAnimations();
  setupGallery();
  lucide.createIcons();
});

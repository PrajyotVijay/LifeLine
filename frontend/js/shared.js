const API_BASE = 'http://localhost:5000/api';

function renderNavbar(activePage = '', root = '../') {
  return `
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <a href="${root}index.html" class="flex items-center gap-2 text-xl font-bold text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            LifeLine
          </a>
          <div class="hidden md:flex items-center gap-6" id="navLinks">
            <a href="${root}index.html" class="font-medium ${activePage === 'home' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'} transition-colors">Home</a>
            <a href="${root}pages/about.html" class="font-medium ${activePage === 'about' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'} transition-colors">About</a>
            <a href="${root}pages/find-donor.html" class="font-medium ${activePage === 'find-donor' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'} transition-colors">Find Donor</a>
            <a href="${root}pages/emergency.html" class="font-medium ${activePage === 'emergency' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'} transition-colors flex items-center gap-1">
              <span style="color:#dc2626;">🚨</span> Emergency
            </a>
            <a href="${root}pages/register.html" class="font-medium ${activePage === 'register' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'} transition-colors">Register as Donor</a>
            <a href="${root}pages/contact.html" class="font-medium ${activePage === 'contact' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'} transition-colors">Contact</a>
            <a href="${root}pages/admin.html" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">Admin</a>
          </div>
          <button onclick="toggleMenu()" class="md:hidden p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
        <div id="mobileMenu" class="hidden md:hidden pb-4 flex-col gap-3">
          <a href="${root}index.html" class="text-gray-700 hover:text-red-600 font-medium">Home</a>
          <a href="${root}pages/about.html" class="text-gray-700 hover:text-red-600 font-medium">About</a>
          <a href="${root}pages/find-donor.html" class="text-gray-700 hover:text-red-600 font-medium">Find Donor</a>
          <a href="${root}pages/emergency.html" class="text-gray-700 hover:text-red-600 font-medium">🚨 Emergency</a>
          <a href="${root}pages/register.html" class="text-gray-700 hover:text-red-600 font-medium">Register as Donor</a>
          <a href="${root}pages/contact.html" class="text-gray-700 hover:text-red-600 font-medium">Contact</a>
          <a href="${root}pages/admin.html" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium w-fit">Admin</a>
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="py-8 bg-gray-900 text-white">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="text-gray-400">© 2026 Organ & Blood Donor Finder. All rights reserved.</p>
      </div>
    </footer>
  `;
}

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
}

function showAlert(containerId, message, type = 'success') {
  const el = document.getElementById(containerId);
  if (!el) return;
  const color = type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200';
  el.innerHTML = `<div class="p-4 rounded-lg ${color} mb-4">${message}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 5000);
}

function showLoader(containerId) {
  document.getElementById(containerId).innerHTML = `
    <div class="flex items-center justify-center py-12 gap-3 text-gray-600">
      <div class="w-7 h-7 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
      Loading...
    </div>
  `;
}
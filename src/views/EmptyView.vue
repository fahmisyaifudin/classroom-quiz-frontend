<template>
  <!--Main Navigation-->
  <header>
    <!-- Sidebar -->
    <nav class="collapse d-lg-block sidebar collapse bg-white">
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Bank Soal</span>
          </a>
          <a href="#" class="list-group-item list-group-item-action py-2 ripple active">
            <i class="fas fa-chart-area fa-fw me-3"></i><span>Quiz</span>
          </a>
        </div>
      </div>
    </nav>
    <!-- Sidebar -->

    <!-- Navbar -->
    <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Right links -->
        <ul class="navbar-nav ms-auto d-flex flex-row">
          <!-- Avatar -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="text-white">Fahmi Syaifudin (Dosen)</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </header>
  <!--Main Navigation-->

  <!--Main layout-->
  <main style="margin-top: 58px">
    <div class="container pt-4">
      <h3>Hello</h3>
    </div>
  </main>
  <!--Main layout-->
</template>

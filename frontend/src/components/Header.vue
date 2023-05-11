<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark pe-3">
    <router-link class="navbar-brand ps-5" to="/">Faux Sales LLC</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <ul class="navbar-nav ms-auto pe-1 text-end">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sales">Sales</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sales/add">Add Sale</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/restock">Restock</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
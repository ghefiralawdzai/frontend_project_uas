<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Ujian Akhir Semester MataKuliah Pemrograman Web</strong>
      </p>
      <p> <a href="https://github.com/Dwinurfitrianto?tab=repositories">Dwi Nur Fitrianto</a> & <a href="https://github.com/ghefiralawdzai">Ghefira Lawdza'i U.F </a></p>
      <p>&copy; {{year}}</p>
    </div>
    <div class="tabs is-centered">
      <ul>
        <li>
          <a href="https://bulma.io/">
            <span class="icon is-small"><img src="/src/assets/library-outline.svg"></span>
            Bulma
          </a>
        </li>
        <li>
          <a href="https://vuejs.org/">
            <span class="icon is-small"><img src="/src/assets/logo.svg"></span>
            Vue JS
          </a>
        </li>
        <li>
          <a href="https://www.mysql.com/>">
            <span class="icon is-small"><img src="/src/assets/server.svg"></span>
            Mysql
          </a>
        </li>
        <li>
          <a href="https://riaudev.com/">
            <span class="icon is-small"><img src="/src/assets/globe-outline.svg"></span>
            RiauDev
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer{
  padding: 20px;
  padding-bottom: 10px;
  background-color: #dfbb9d;
  background: linear-gradient(180deg,#a27b5c,#dcd7c9);
  border-color: white;
  alignment: center;
}

</style>
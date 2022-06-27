<template>
  <section class="hero mt-5 is-small">
    <div class="hero-body">
      <p class="title">
        Detail Mahasiswa
      </p>
      <p class="subtitle">
        Menampilkan daftar nama Mahasiswa berdasarkan NIM
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="mahasiswa">
      <div class="card mt-2">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/src/assets/profile.png" alt="image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title2 is-4">NIM {{nim}}</p>
              <p class="title2 is-6">{{mahasiswa.nama}}</p>
            </div>
          </div>
          <hr>
          <div class="content">
            <dl>
              <dt>NIM</dt>
              <dd><strong>{{mahasiswa.nim}}</strong></dd>

              <dt>Nama</dt>
              <dd><strong>{{mahasiswa.nama}}</strong></dd>

              <dt>Dosen PA</dt>
              <dd><strong>{{mahasiswa.dosen.nama}}</strong></dd>

              <dt>Prodi</dt>
              <dd><strong>{{mahasiswa.prodi}}</strong></dd>

              <dt>Semester</dt>
              <dd><strong>{{mahasiswa.semester}}</strong></dd>

              <dt>Tanggal Lahir</dt>
              <dd><strong>{{mahasiswa.tanggallahir}}</strong></dd>

              <dt>Email</dt>
              <dd><strong>{{mahasiswa.email}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/mahasiswa" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
              <div class="column has-text-right">
                Created at {{mahasiswa.created_at}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, buku dengan <strong>NIM `{{nim}}` tidak ditemukan</strong>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "MahasiswaDetailView",
  data() {
    return {
      mahasiswa: null,
      nim: this.$route.params.nim,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://backend.projectbersama.my.id/mahasiswa/get.php?nim=${this.nim}`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.mahasiswa = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
.hero{
  background-color: #A97155;
  border-radius: 10px;
}
.card{
  background-color: #e2d5b1;
  margin-bottom: 20px;
}
.title{
  text-align: center;
  color: white;
}
.subtitle{
  text-align: center;
  color: white;
}
.title2{
  font-family: "Times New Roman";
  font-weight: bold;
}
</style>
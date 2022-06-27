<template>
  <section class="hero mt-5 is-small">
    <div class="hero-body">
      <p class="title">
        Detail MataKuliah
      </p>
      <p class="subtitle">
        Menampilkan daftar nama MataKuliah berdasarkan Kodemk.
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="matakuliah">
      <div class="card mt-2">
        <div class="card-content">
          <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="/src/assets/buku.png" alt="image">
            </figure>
          </div>
            <div class="media-content">
              <p class="title2 is-4">{{kodemk}}</p>
              <p class="title2 is-6">{{matakuliah.namamk}}</p>
            </div>
          </div>
          <hr>
          <div class="content">
            <dl>
              <dt>Kodemk</dt>
              <dd><strong>{{matakuliah.kodemk}}</strong></dd>

              <dt>Nama Matakuliah</dt>
              <dd><strong>{{matakuliah.namamk}}</strong></dd>

              <dt>Kurikulum</dt>
              <dd><strong>{{matakuliah.kurikulum}}</strong></dd>

              <dt>Semester</dt>
              <dd><strong>{{matakuliah.sks}}</strong></dd>

              <dt>Kategori</dt>
              <dd><strong>{{matakuliah.kategori}}</strong></dd>

              <dt>Jadwal</dt>
              <dd><strong>{{matakuliah.jadwal}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/matakuliah" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
              <div class="column has-text-right">
                Created at {{matakuliah.created_at}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, buku dengan <strong>KODEMK `{{kodemk}}` tidak ditemukan</strong>
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
  name: "MatakuliahDetailView",
  data() {
    return {
      matakuliah: null,
      kodemk: this.$route.params.kodemk,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://backend.projectbersama.my.id/matakuliah/get.php?kodemk=${this.kodemk}`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.matakuliah = json.data;
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
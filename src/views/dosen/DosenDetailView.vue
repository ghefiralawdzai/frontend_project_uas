<template>
  <section class="hero mt-5 is-small">
    <div class="hero-body">
      <p class="title">
        Detail Dosen
      </p>
      <p class="subtitle">
        Menampilkan daftar nama Dosen berdasarkan NIP
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="dosen">
      <div class="card mt-2">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/src/assets/profile.png" alt="image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title2 is-4 ">{{nip}}</p>
              <p class="title2 is-6">{{dosen.nama}}</p>
            </div>
          </div>
          <hr>
          <div class="content">
            <dl>
              <dt>NIP</dt>
              <dd><strong>{{dosen.nip}}</strong></dd>

              <dt>Nama</dt>
              <dd><strong>{{dosen.nama}}</strong></dd>

              <dt>MataKuliah</dt>
              <dd><strong>{{dosen.matakuliah.namamk}}</strong></dd>

              <dt>Tanggal Lahir</dt>
              <dd><strong>{{dosen.tanggallahir}}</strong></dd>

              <dt>NO HP</dt>
              <dd><strong>{{dosen.nohp}}</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{dosen.alamat}}</strong></dd>

              <dt>Jabatan</dt>
              <dd><strong>{{dosen.jabatan}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/dosen" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
              <div class="column has-text-right">
                Created at {{dosen.created_at}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, dosen dengan <strong>NIP `{{nip}}` tidak ditemukan</strong>
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
  name: "DosenDetailView",
  data() {
    return {
      dosen: null,
      nip: this.$route.params.nip,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://backend.projectbersama.my.id/dosen/get.php?nip=${this.nip}`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.dosen = json.data;
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
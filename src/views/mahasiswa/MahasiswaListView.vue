<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Data Mahasiswa
      </p>
      <p class="subtitle">
        Berikut adalah data Mahasiswa yang terdaftar dalam Project Bersama Uas Pemograman Web.
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button mb-3 is-link" @click="showAdd">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
          </span>
        <span>Create</span>
      </button>
      <table class="table">
        <thead class="table-name">
        <tr>
          <th>NO</th>
          <th>NIM</th>
          <th>NAMA MAHASISWA</th>
          <th>PRODI</th>
          <th>SEMESTER</th>
          <th>DOSEN PA</th>
          <th>MATAKULIAH</th>
          <th>KETERANGAN</th>
        </tr>
        </thead>
        <tbody class="isi">
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.nim}}</td>
          <td>{{value.nama}}</td>
          <td>{{value.prodi}}</td>
          <td>{{value.semester}}</td>
          <td>{{value.dosen.nama}}</td>
          <td>{{value.matakuliah.namamk}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'mahasiswa-detail', params: { nim:  value.nim}}">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                  <span>Detail</span>
                </RouterLink>
              </p>
              <p class="control">
                <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                  <span>Update</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </p>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9">
            <div class="notification is-warning">
              Tidak ada data
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p class="api has-text-white">API endpoint <strong class="api has-text-white"> https://backend.projectbersama.my.id/mahasiswa/</strong></p>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>NIM <strong>{{data[selectedIndex].nim}}</strong></li>
            <li>NAMA <strong>{{data[selectedIndex].nama}}</strong></li>
            <li>PRODI <strong>{{data[selectedIndex].prodi}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_update">NAMA</label>
              <div class="control">
                <input class="input" type="text" id="nama_update" placeholder="Nama" required v-model="formEdit.nama">
              </div>
            </div>
            <div class="field">
              <label class="label" for="prodi_update">Prodi</label>
              <div class="control">
                <input class="input" type="text" id="prodi_update" placeholder="Prodi" required v-model="formEdit.prodi">
              </div>
            </div>
            <div class="field">
              <label class="label" for="dosen_update">Dosen PA</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="dosen_update" id="dosen_update" v-model="formEdit.dosen">
                    <option value="0" disabled>---Dosen PA---</option>
                    <option v-for="val in dosen" :value="val.nip">{{val.nama}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="matakuliah_update">MataKuliah</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="matakuliah_update" id="matakuliah_update" v-model="formEdit.matakuliah">
                    <option value="0" disabled>---MataKuliah---</option>
                    <option v-for="val in matakuliah" :value="val.kodemk">{{val.namamk}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="semester_update">Semester</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="number" id="semester_update" placeholder="Semester" required v-model="formEdit.semester" min="1" max="10000">
                </p>
                <p class="control">
                  <a class="button is-static">
                  </a>
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label" for="tanggallahir_update">Tanggal Lahir</label>
              <div class="control">
                <input class="input" type="date" id="tanggallahir_update" placeholder="Tanggallahir" required v-model="formEdit.tanggallahir">
              </div>
            </div>
            <div class="field">
              <label class="label" for="email_update">Email</label>
              <div class="control">
                <textarea id="email_update" class="text" placeholder="email" v-model="formEdit.email"></textarea>
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="nim_insert">NIM</label>
            <div class="control">
              <input class="input" type="text" id="nim_insert" placeholder="NIM" required v-model="formAdd.nim">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_insert">Nama</label>
            <div class="control">
              <input class="input" type="text" id="nama_insert" placeholder="Nama" required v-model="formAdd.nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="prodi_insert">Prodi</label>
            <div class="control">
              <input class="input" type="text" id="prodi_insert" placeholder="Prodi" required v-model="formAdd.prodi">
            </div>
          </div>
          <div class="field">
            <label class="label" for="dosen_insert">Dosen PA</label>
            <div class="control">
              <div class="select is-primary">
                <select name="dosen_insert" id="dosen_insert" v-model="formAdd.dosen">
                  <option value="0" disabled>---Dosen PA---</option>
                  <option v-for="val in dosen" :value="val.nip">{{val.nama}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="matakuliah_insert">MataKuliah</label>
            <div class="control">
              <div class="select is-primary">
                <select name="matakuliah_insert" id="matakuliah_insert" v-model="formAdd.matakuliah">
                  <option value="0" disabled>---MataKuliah---</option>
                  <option v-for="val in matakuliah" :value="val.kodemk">{{val.namamk}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="semester_insert">Semester</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="number" id="semester_insert" placeholder="Semester" required v-model="formAdd.semester" min="1" max="10000">
              </p>
              <p class="control">
                <a class="button is-static">
                </a>
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label" for="tanggallahir_insert">Tanggal Lahir</label>
            <div class="control">
              <input class="input" type="date" id="tanggallahir_insert" placeholder="Tanggallahir" required v-model="formAdd.tanggallahir">
            </div>
          </div>
          <div class="field">
            <label class="label" for="email_insert">Email</label>
            <div class="control">
              <textarea id="email_insert" class="text" placeholder="Email" v-model="formAdd.email"></textarea>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";

export default {
  name: "MahasiswaListView",
  data(){
    return{
      data: [],
      dosen: [],
      matakuliah:[],

      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        nim: '',
        dosen: 0,
        matakuliah:0,
        prodi: '',
        nama: '',
        email: '',
        semester: 1,
        tanggallahir: new Date().toISOString().slice(0, 10)
      },
      formEdit: {
        nim: '',
        dosen: 0,
        matakuliah:0,
        prodi: '',
        nama: '',
        email: '',
        semester: 1,
        tanggallahir: new Date().toISOString().slice(0, 10)
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://backend.projectbersama.my.id/mahasiswa/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.data = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadDosen(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://backend.projectbersama.my.id/dosen/index.php`,{
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
    },
    loadMatakuliah(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://backend.projectbersama.my.id/matakuliah/index.php`,{
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
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const selectedData = this.data[this.selectedIndex];

        const payload = new URLSearchParams({
          'nim': selectedData.nim
        });

        fetch(`https://backend.projectbersama.my.id/mahasiswa/delete.php`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'API-Key': 'secret'
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.data.splice(this.selectedIndex, 1);
            }
            return response.json();
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }
          })
          .catch(()=>{
            alert('Terjadi error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          email: this.formEdit.email,
          nama: this.formEdit.nama,
          prodi: this.formEdit.prodi,
          tanggallahir: this.formEdit.tanggallahir,
          dosen: this.formEdit.dosen,
          matakuliah: this.formEdit.matakuliah,
          semester: this.formEdit.semester,
          nim: this.formEdit.nim,
        });

        fetch(`https://backend.projectbersama.my.id/mahasiswa/update.php`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'API-Key': 'secret'
          },
          body: payload.toString(),
        })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              /*
              Update data pada kolom yg diupdate
               */
              this.data[this.selectedIndex] = json.data;
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.selectedIndex = -1;
          })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.data[index];
      this.formEdit = {
        nim: selectedData.nim,
        nama: selectedData.nama,
        email: selectedData.email,
        semester: selectedData.semester,
        dosen: selectedData.dosen.nip,
        matakuliah: selectedData.matakuliah.kodemk,
        prodi: selectedData.prodi,
        tanggallahir: selectedData.tanggallahir,
      }
      nextTick(()=>{
        document.getElementById('nama_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('nim_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        email: this.formAdd.email,
        nama: this.formAdd.nama,
        prodi: this.formAdd.prodi,
        tanggallahir: this.formAdd.tanggallahir,
        dosen: this.formAdd.dosen,
        matakuliah: this.formAdd.matakuliah,
        semester: this.formAdd.semester,
        nim: this.formAdd.nim,
      });

      fetch(`https://backend.projectbersama.my.id/mahasiswa/create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'API-Key': 'secret'
        },
        body: payload.toString(),
      })
        .then(response => {
          return response.json()
        })
        .then(json =>{
          if(!json.status){
            alert(json.error);
          }else{
            this.data.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama = '';
        })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        email: '',
        nama: '',
        semester: 1,
        dosen: 0,
        matakuliah:0,
        prodi: '',
        tanggallahir: new Date().toISOString().slice(0, 10)
      }
    }
  },
  mounted() {
    this.load();
    this.loadDosen();
    this.loadMatakuliah();
  }
}
</script>

<style scoped>
.table-name{
  background-color: #A97155;
}
.isi{
  background-color: #e2d5b1;
}
.table{
  box-shadow: 0 3px 10px rgba(0, 0, 0, 1);
}
</style>
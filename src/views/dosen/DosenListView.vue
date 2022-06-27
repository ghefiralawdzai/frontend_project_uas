<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Data Dosen
      </p>
      <p class="subtitle">
        Berikut adalah Data Dosen Pembimbing Akademik yang terdapat dalam Project Bersama Uas Pemograman Web.
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
          <th>NIP</th>
          <th>NAMA DOSEN</th>
          <th>MATAKULIAH</th>
          <th>JABATAN</th>
          <th>KETERANGAN</th>
        </tr>
        </thead>
        <tbody class="isi">
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.nip}}</td>
          <td>{{value.nama}}</td>
          <td>{{value.matakuliah.namamk}}</td>
          <td>{{value.jabatan}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'dosen-detail', params: { nip:  value.nip}}">
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
    <p class="api has-text-white">API endpoint <strong class="api has-text-white"> https://backend.projectbersama.my.id/dosen/</strong></p>
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
            <li>NIP <strong>{{data[selectedIndex].nip}}</strong></li>
            <li>NAMA <strong>{{data[selectedIndex].nama}}</strong></li>
            <li>TANGGAL LAHIR <strong>{{data[selectedIndex].tanggallahir}}</strong></li>
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
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="matakuliah_update">MataKuliah</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="matakuliah_update" id="matakuliah_update" v-model="formEdit.matakuliah">
                    <option v-for="val in matakuliah" :value="val.kodemk">{{val.namamk}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="nohp_update">No HP</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="text" id="nohp_update" placeholder="Nohp" required v-model="formEdit.nohp">
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
              <label class="label" for="jabatan_update">Jabatan</label>
              <div class="control">
                <textarea id="jabatan_update" class="text" placeholder="jabatan" v-model="formEdit.jabatan"></textarea>
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
            <label class="label" for="nip_insert">NIP</label>
            <div class="control">
              <input class="input" type="text" id="nip_insert" placeholder="NIP" required v-model="formAdd.nip">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_insert">Nama</label>
            <div class="control">
              <input class="input" type="text" id="nama_insert" placeholder="Nama" required v-model="formAdd.nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
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
            <label class="label" for="nohp_insert">No HP</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" id="nohp_insert" placeholder="NoHP" required v-model="formAdd.nohp">
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
            <label class="label" for="jabatan_insert">Jabatan</label>
            <div class="control">
              <textarea id="jabatan_insert" class="text" placeholder="Jabatan" v-model="formAdd.jabatan"></textarea>
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
  name: "DosenListView",
  data(){
    return{
      data: [],
      matakuliah: [],

      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        nip: '',
        matakuliah: 0,
        nama: '',
        alamat: '',
        jabatan: '',
        nohp: '',
        tanggallahir: new Date().toISOString().slice(0, 10)
      },
      formEdit: {
        nip: '',
        matakuliah: 0,
        nama: '',
        alamat: '',
        jabatan: '',
        nohp: '',
        tanggallahir: new Date().toISOString().slice(0, 10)
      }
    }
  },
  methods:{
    load(){
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
          this.data = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadKategori(){
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
          'nip': selectedData.nip
        });

        fetch(`https://backend.projectbersama.my.id/dosen/delete.php`,{
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
          jabatan: this.formEdit.jabatan,
          nama: this.formEdit.nama,
          alamat: this.formEdit.alamat,
          tanggallahir: this.formEdit.tanggallahir,
          matakuliah: this.formEdit.matakuliah,
          nohp: this.formEdit.nohp,
          nip: this.formEdit.nip,
        });

        fetch(`https://backend.projectbersama.my.id/dosen/update.php`,{
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
        nip: selectedData.nip,
        nama: selectedData.nama,
        alamat: selectedData.alamat,
        nohp: selectedData.nohp,
        matakuliah: selectedData.matakuliah.kodemk,
        jabatan: selectedData.jabatan,
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
        document.getElementById('nip_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        jabatan: this.formAdd.jabatan,
        nama: this.formAdd.nama,
        alamat: this.formAdd.alamat,
        tanggallahir: this.formAdd.tanggallahir,
        matakuliah: this.formAdd.matakuliah,
        nohp: this.formAdd.nohp,
        nip: this.formAdd.nip,
      });

      fetch(`https://backend.projectbersama.my.id/dosen/create.php`,{
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
        jabatan: '',
        nama: '',
        nohp: '',
        matakuliah: 0,
        alamat: '',
        tanggallahir: new Date().toISOString().slice(0, 10)
      }
    }
  },
  mounted() {
    this.load();
    this.loadKategori();
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
  box-shadow: 0 3px 10px rgb(65, 53, 53);
}
</style>
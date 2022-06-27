<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Data MataKuliah
      </p>
      <p class="subtitle">
        Berikut adalah Data Matakuliah yang tersedia didalam Project Bersama Uas Pemograman Web.
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button ml-2 mb-3 is-link" @click="showAdd">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
          </span>
        <span>Create</span>
      </button>
      <table class="table">
        <thead class="table-name">
        <tr>
          <th>NO</th>
          <th>KODEMK</th>
          <th>NAMA MATAKULIAH</th>
          <th>KURIKULUM</th>
          <th>SKS</th>
          <th>KATEGORI</th>
          <th>JADWAL</th>
          <th>KETERANGAN</th>
        </tr>
        </thead>
        <tbody class="isi">
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.kodemk}}</td>
          <td>{{value.namamk}}</td>
          <td>{{value.kurikulum}}</td>
          <td>{{value.sks}}</td>
          <td>{{value.kategori}}</td>
          <td>{{value.jadwal}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'matakuliah-detail', params: { kodemk:  value.kodemk}}">
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
    <p class="api has-text-white">API endpoint <strong class="api has-text-white"> https://backend.projectbersama.my.id/matakuliah/</strong></p>
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
            <li>KODEMK <strong>{{data[selectedIndex].kodemk}}</strong></li>
            <li>NAMA MATAKULIAH<strong>{{data[selectedIndex].namamk}}</strong></li>
            <li>KURIKULUM <strong>{{data[selectedIndex].kurikulum}}</strong></li>
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
              <label class="label" for="namamk_update">Nama MataKuliah</label>
              <div class="control">
                <input class="input" type="text" id="namamk_update" placeholder="Nama Matakuliah" required v-model="formEdit.namamk">
              </div>
            </div>
            <div class="field">
              <label class="label" for="kurikulum_update">Kurikulum</label>
              <div class="control">
                <input class="input" type="text" id="kurikulum_update" placeholder="Kurikulum" required v-model="formEdit.kurikulum">
              </div>
            </div>
            <div class="field">
              <label class="label" for="sks_update">SKS</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="number" id="sks_update" placeholder="SKS" required v-model="formEdit.sks" min="1" max="10000">
                </p>
                <p class="control">
                  <a class="button is-static">
                  </a>
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label" for="kategori_update">Kategori</label>
              <div class="control">
                <input class="input" type="text" id="kategori_update" placeholder="Kategori" required v-model="formEdit.kategori">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jadwal_update">Jadwal</label>
              <div class="control">
                <textarea id="jadwal_update" class="text" placeholder="Jadwal" v-model="formEdit.jadwal"></textarea>
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
            <label class="label" for="kodemk_insert">KodeMK</label>
            <div class="control">
              <input class="input" type="text" id="kodemk_insert" placeholder="Kodemk" required v-model="formAdd.kodemk">
            </div>
          </div>
          <div class="field">
            <label class="label" for="namamk_insert">Nama MataKuliah</label>
            <div class="control">
              <input class="input" type="text" id="namamk_insert" placeholder="Nama MataKuliah" required v-model="formAdd.namamk">
            </div>
          </div>
          <div class="field">
            <label class="label" for="kurikulum_insert">Kurikulum</label>
            <div class="control">
              <input class="input" type="text" id="kurikulum_insert" placeholder="Kurikulum" required v-model="formAdd.kurikulum">
            </div>
          </div>
          <div class="field">
            <label class="label" for="sks_insert">SKS</label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="number" id="sks_insert" placeholder="SKS" required v-model="formAdd.sks" min="1" max="10000">
              </p>
              <p class="control">
                <a class="button is-static">
                </a>
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label" for="kategori_insert">Kategori</label>
            <div class="control">
              <input class="input" type="text" id="kategori_insert" placeholder="Kategori" required v-model="formAdd.kategori">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jadwal_insert">Jadwal</label>
            <div class="control">
              <textarea id="jadwal_insert" class="text" placeholder="Jadwal" v-model="formAdd.jadwal"></textarea>
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
  name: "MatakuliahListView",
  data(){
    return{
      data: [],

      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        kodemk: '',
        namamk: '',
        kurikulum: '',
        sks: 1,
        kategori: '',
        jadwal: '',
      },
      formEdit: {
        kodemk: '',
        namamk: '',
        kurikulum: '',
        sks: 1,
        kategori: '',
        jadwal: '',
      }
    }
  },
  methods:{
    load(){
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
          this.data = json.data;
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
          'kodemk': selectedData.kodemk
        });

        fetch(`https://backend.projectbersama.my.id/matakuliah/delete.php`,{
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
          jadwal: this.formEdit.jadwal,
          kategori: this.formEdit.kategori,
          sks: this.formEdit.sks,
          kurikulum: this.formEdit.kurikulum,
          namamk: this.formEdit.namamk,
          kodemk: this.formEdit.kodemk,
        });

        fetch(`https://backend.projectbersama.my.id/matakuliah/update.php`,{
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
        kodemk: selectedData.kodemk,
        namamk: selectedData.namamk,
        kurikulum: selectedData.kurikulum,
        sks: selectedData.sks,
        kategori: selectedData.kategori,
        jadwal: selectedData.jadwal,
      }
      nextTick(()=>{
        document.getElementById('namamk_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('kodemk_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        jadwal: this.formAdd.jadwal,
        namamk: this.formAdd.namamk,
        kurikulum: this.formAdd.kurikulum,
        sks: this.formAdd.sks,
        kategori: this.formAdd.kategori,
        kodemk: this.formAdd.kodemk,
      });

      fetch(`https://backend.projectbersama.my.id/matakuliah/create.php`,{
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
        jadwal: '',
        namamk: '',
        sks: 1,
        kurikulum: '',
        kategori: '',
      }
    }
  },
  mounted() {
    this.load();
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
  box-shadow: 0 3px 10px rgba(0, 0, 0, 3);
}

</style>
import {createRouter, createWebHistory} from "vue-router";
import IndexView from '../views/IndexView.vue';
import AboutView from "../views/AboutView.vue";
import Error404View from "../views/error/Error404View.vue";
import DosenDetailView from "../views/dosen/DosenDetailView.vue";
import DosenListView from "../views/dosen/DosenListView.vue";
import MahasiswaListView from "../views/mahasiswa/MahasiswaListView.vue";
import MahasiswaDetailView from "../views/mahasiswa/MahasiswaDetailView.vue";
import MatakuliahListView from "../views/matakuliah/MatakuliahListView.vue";
import MatakuliahDetailView from "../views/matakuliah/MatakuliahDetailView.vue";

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'About'
    }
  },
  {
    path: '/mahasiswa',
    name: 'mahasiswa',
    component: MahasiswaListView,
    meta: {
      title: 'Mahasiswa list'
    }
  },
  {
    path: '/mahasiswa/:nim',
    name: 'mahasiswa-detail',
    component: MahasiswaDetailView,
    meta: {
      title: 'Buku detail'
    }
  },
  {
    path: '/dosen',
    name: 'dosen',
    component: DosenListView,
    meta: {
      title: 'Dosen list'
    }
  },
  {
    path: '/dosen/:nip',
    name: 'dosen-detail',
    component: DosenDetailView,
    meta: {
      title: 'Dosen detail'
    }
  },
  {
    path: '/matakuliah',
    name: 'matakuliah',
    component: MatakuliahListView,
    meta: {
      title: 'Matakuliah list'
    }
  },
  {
    path: '/matakuliah/:kodemk',
    name: 'matakuliah-detail',
    component: MatakuliahDetailView,
    meta: {
      title: 'Matakuliah detail'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: Error404View,
    meta: {
      title: 'Error 404'
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.afterEach((to, from, next) => {
  const metaTitle = to.meta.title;
  if(metaTitle){
    document.title = metaTitle+" - "+DEFAULT_TITLE;
  }else{
    document.title = DEFAULT_TITLE;
  }
})


export default router
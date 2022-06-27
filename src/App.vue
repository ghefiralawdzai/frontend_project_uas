<script>
import FooterView from "./views/FooterView.vue";
import TopNavView from "./views/TopNavView.vue";
export default {
  components: {TopNavView, FooterView}
}
</script>

<template>
  <TopNavView/>
  <main>
    <div class="atas"></div>
    <div class="container">
      <RouterView/>
    </div>
  </main>
  <FooterView/>
</template>
<style>
main{
  background-image: url("/src/assets/kom.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 2);
}
.atas{
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(176, 118, 0, 0.3);
}
.title{
  font-family: "Rockwell Extra Bold";
}
.subtitle{
  font-family: "Times New Roman";
}
</style>
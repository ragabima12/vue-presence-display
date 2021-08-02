<template>
  <div>
    <!-- Background Success -->
    <div
      class="background-image"
      :style="`background-image: url('${require('@/assets/background-success.svg')}')`"
    ></div>
    <!-- Background Success -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  // name: "Home",
  mounted() {},
};
</script>

<style scoped>
/* CSS Success */
.background-image {
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.image-student {
  width: 267px;
  height: 330px;
  background-color: black;
  position: absolute;
  top: 32%;
  left: 26%;

  background-size: cover;
}

.title-name-student > h1 {
  font-family: "Exo", sans-serif;
  font-size: 38px;
  color: white;
  text-align: center;
  /* margin-top: 20px; */
  /* padding-right: 200px; */
}

.title-name-student {
  /* background-color: white; */
  width: 380px;
  height: 48px;
  position: absolute;
  top: 30%;
  left: 48%;
}

.class-student {
  width: 256px;
  /* background-color: white; */
  font-family: "Exo", sans-serif;
  position: absolute;
  color: white;
  top: 40%;
  left: 52.3%;
  text-align: center;
}

.time-coming {
  position: absolute;
  top: 64%;
  left: 52.2%;
  width: 256px;
  /* background-color: white; */
  text-align: center;
  color: white;
  font-family: "Exo", sans-serif;
}
/* CSS Success End */
</style>

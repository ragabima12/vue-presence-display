<template>
  <div>
    <!-- Background Error -->
    <div
      class="image-error"
      :style="`background-image: url('${require('@/assets/background-error-handling.svg')}')`"
    >
      <div class="error-text">
        <slot>
          <h1>Maaf Telah Terjadi Kesalahan Server</h1>
        </slot>
      </div>
    </div>
    <!-- Background Error End -->
  </div>
</template>

<script>
export default {};
</script>

<style>
/* CSS Error */
.image-error {
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
}

.error-text > h1 {
  font-family: "Exo", sans-serif;
  color: white;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  /* background-color: rgb(0, 0, 0); */
  text-align: center;
  font-size: 38px;
}
/* CSS Error End */
</style>
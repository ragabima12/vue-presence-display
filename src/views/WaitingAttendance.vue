<template>
  <div>
    <!-- Background Waiting -->
    <div class="wallpaper-container">
      <h1 class="realtime-clock">
        {{ clock }}
      </h1>
      <video loop muted autoplay>
        <source
          :src="require('@/assets/background-waiting.mp4')"
          type="video/mp4"
        />
      </video>
    </div>
    <!-- Background Waiting End -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      clock: "",
    };
  },
  methods: {
    updateTime() {
      let date = new Date().toLocaleString();
      date = date.split(" ");
      let time = date[1];
      time = time.split(":");
      let hours = time[0];
      let minutes = time[1];
      let format = date[2];
      let timeNow = `${hours}:${minutes} ${format}`;
      this.clock = timeNow;
    },
  },
  mounted() {
    setInterval(this.updateTime, 1000);
  },
};
</script>

<style>
.wallpaper-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto auto;
  background-size: cover;
  background-repeat: no-repeat;
}

.wallpaper-container > video {
  position: absolute;
  width: 100%;
  margin: auto;
}

.wallpaper-container > .realtime-clock {
  position: absolute;
  z-index: 1;
  top: 0%;
  left: 43%;
  color: white;
  font-size: 44px;
  width: 200px;
  text-align: center;
  font-family: "Exo", sans-serif;
  margin-top: 10px;
}
</style>
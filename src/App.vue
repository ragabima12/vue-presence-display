<template>
  <div
    id="app"
    style="position: absolute; width: 100%; height: 100%; margin: 0; padding: 0"
  >
    <WaitingAttendance v-if="currentPage == 'waiting'" />
    <ErrorAttendance v-if="currentPage == 'error'">
      <h1>{{errorMessage}}</h1>
    </ErrorAttendance>
    <SuccessAttendance v-if="currentPage == 'success'" />
  </div>
</template>

<script>
import WaitingAttendance from "@/views/WaitingAttendance.vue";
import ErrorAttendance from "@/views/ErrorAttendance.vue";
import SuccessAttendance from "@/views/SuccessAttendance.vue";

import Socket from "socket.io-client";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      cardId: ""
    };
  },
  components: {
    WaitingAttendance,
    ErrorAttendance,
    SuccessAttendance,
  },
  methods: {
    storeAttendance(ev) {
      console.log(ev);
      let payload = {
        id_card: ev,
      };
      this.$store.dispatch("storeAttendance", payload);
    }
  },
  mounted() {
    let io = Socket(process.env.VUE_APP_SOCKET_HOST);
    const waitFor = (duration, callback=() => {}) => new Promise((resolve, reject) => typeof callback === 'function' && setTimeout(callback, duration) || resolve(null))
    io.on("presence", async () => {
      this.$store.commit("setCurrentPage", "success");
      await waitFor(2000, () => {
        return this.$store.commit("setCurrentPage", "waiting");
      })
    });

    io.on('error', async(message) => {
      this.$store.commit('setCurrentPage', 'error')
      this.$store.commit('setErrorMessage', message)
      await waitFor(2000, () => {
        return this.$store.commit('setCurrentPage', 'waiting')
      })
    })
  },
  computed: {
    ...mapGetters({
      currentPage: "getCurrentPage",
      studentData: "getStudentData",
      errorMessage: 'getErrorMessage'
    }),
  },
};
</script>

<style>
</style>

<template>
  <div
    id="app"
    style="position: absolute; width: 100%; height: 100%; margin: 0; padding: 0"
  >
    <WaitingAttendance v-if="currentPage == 'waiting'" />
    <ErrorAttendance v-if="currentPage == 'error'" />
    <SuccessAttendance v-if="currentPage == 'success'" />
    {{ studentData }}
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
      cardId: "",

      studentimageSource: "",
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
    },
  },
  mounted() {
    let io = Socket("http://192.168.0.106:9090");
    io.on("presence", (studentData) => {
      this.$store.commit("setStudentData", studentData);
      this.$store.commit("setCurrentPage", "success");

      setInterval(() => {
        return this.$store.commit("setCurrentPage", "waiting");
      }, 3000);
    });
  },
  computed: {
    ...mapGetters({
      currentPage: "getCurrentPage",
      studentData: "getStudentData",
    }),
  },
};
</script>

<style>
</style>

<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">Employee ID#: {{ employee_id }}</li>
      <li class="collection-item">Department: {{ dept }}</li>
      <li class="collection-item">Position: {{ position }}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button class="btn red" @click="deleteEmployee">Delete</button>
    <div class="fixed-action-btn">
      <router-link
        :to="{ name: 'EditEmployee', params: { employee_id: employee_id } }"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "ViewEmployee",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          next(vm => {
            (vm.employee_id = data.employee_id),
              (vm.name = data.name),
              (vm.dept = data.dept),
              (vm.position = data.position);
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            (this.employee_id = data.employee_id),
              (this.name = data.name),
              (this.dept = data.dept),
              (this.position = data.position);
          });
        });
    },
    deleteEmployee() {
      if (confirm("Are you sure?")) {
        db.collection("employees")
          .where("employee_id", "==", this.$route.params.employee_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

import { defineStore } from "pinia";
import { reactive } from "vue";

export const useGlobalStore = defineStore("global", () => {
  let user = reactive({
    id: localStorage.getItem("id") || null,
    email: localStorage.getItem("email") || null,
    isAdmin: localStorage.getItem("isAdmin") === "true"
  });

  function setUser(email, isAdmin, _id) {
    user.id = _id;
    user.email = email;
    user.isAdmin = isAdmin;
  }

  return { user, setUser };
});
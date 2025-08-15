import { ref } from "vue";
import profileData from "../../public/Data.json";

const profile = ref(profileData);

export function useProfile() {
  return { profile };
}
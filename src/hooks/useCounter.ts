import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  function incremenet(){
    count.value++
  }
  return {
    count,
    incremenet
  }
}
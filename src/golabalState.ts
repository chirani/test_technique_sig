import { reactive } from 'vue'

interface GloabalState {
  Theme: 'dark' | 'light'
}
export const store = reactive<GloabalState>({
  Theme: 'light',
})

export function toggleThem() {
  store.Theme = store.Theme === 'light' ? 'dark' : 'light'
}

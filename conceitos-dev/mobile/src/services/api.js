import axios from 'axios'

const api = axios.create({
    /**
     * ios com emulador: localhost
     * ios com dispositivo físico: IP da máquina
     * 
     * android com emulador: localhost => cmd: adb reverse tcp:3333 tcp:3333
     * android com emulador: 10.0.2.2 (Android Studio)
     * android com emulador: 10.0.3.2 (Genymotion)
     * android com dispositivo físico: IP da máquina
     */
    baseURL: 'http://10.0.2.2:3333'
})

export default api
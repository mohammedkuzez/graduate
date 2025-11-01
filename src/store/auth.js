import { defineStore } from "pinia";

export const  useAuthStore = defineStore('auth', {
    state: () => ({
        me: {},
        register: {},
    }),
    actions: {
        async login(email,password) {
            try {
                let res = await fetch('https://project-management-barakah.vercel.app/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                this.me = await res.json();
                localStorage.setItem("userId", this.me.user.id); 
                console.log('Who I am: ', this.me);
                localStorage.setItem("token", this.me.access_token)
                if(this.me.access_token) return true 
                else return false
            } catch (error) {
                console.log("Login error:", error)
                return false
            }
        },
        async SignUp(firstName,lastName,email,password,role) {
            try {
                let res = await fetch('https://project-management-barakah.vercel.app/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ firstName,lastName,email,password,role }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                this.register = await res.json()
                console.log('register: ', this.register);
                if(this.register.access_token) return true 
                else return false
            } catch (error) {
                console.log("Login error:", error)
                return false
            }
        }
    }
})
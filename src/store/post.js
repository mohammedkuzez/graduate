import { defineStore } from 'pinia'

export const useDataStore = defineStore('project', {
    state: () => ({
        users : [],
        AllProjects: [],
        ProjectManag : [],
        CreatePro : {},
        UpdatePro: {},
        DeletePro: '',
        token: localStorage.getItem('token'),
        userId: Number(localStorage.getItem('userId')),
    }),
    actions: {
        async Projectlist() {

            try {
                const res = await fetch('https://project-management-barakah.vercel.app/projects', {
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                    },
                })
                this.AllProjects = await res.json()
                console.log('ProjectManag: ', this.AllProjects);
                console.log('userId: ', this.userId);
                this.ProjectManag = this.AllProjects.filter(
                project =>
                    project.creator.id === this.userId ||
                    project.assignedUsers.some(user => user.id === this.userId)
                );
                console.log('ProjectManag: ', this.ProjectManag);
                return this.ProjectManag
            } catch (error) {
                console.log(error)
            }
        },
        async createProject(name,description,dueDate) {
            try {
                const res = await fetch('https://project-management-barakah.vercel.app/projects', {
                    method: "POST",
                    body: JSON.stringify({ name,description,dueDate }),
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                    },
                })
                this.CreatePro = await res.json()
                console.log('CreatePro: ', this.CreatePro);
                
                return true
            } catch (error) {
                console.log(error)
            }
        },
        async updateProject(id,name,description,dueDate) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/projects/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ name,description,dueDate }),
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                    },
                })
                this.UpdatePro = await res.json()
                console.log('UpdatePro: ', this.UpdatePro);
                return true
            } catch (error) {
                console.log(error)
            }
        },
        async deleteProject(id) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/projects/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                    },
                })
                this.DeletePro = await res.json()
                console.log('Deleteid: ', id);
                console.log('DeletePro: ', this.DeletePro);
                if(this.DeletePro.message == 'Project successfully deleted') return true
                else return false
            } catch (error) {
                console.log(error)
            }
        },
    },
})
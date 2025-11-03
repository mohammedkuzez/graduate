import Dashboard from '@/components/Dashboard.vue';
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
        ProjectName: '',
        ProjectDate: '',
        GetTasksProject: {},
        getInvitations: [],
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
                if(this.DeletePro.id) return true
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async GetTasksByProjectId(projectId) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/tasks/project/${projectId}`, {
                    method: "GET",
                    headers: {
                        Authorization:
                        `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                })
                this.GetTasksProject = await res.json()
                console.log('GetTasksProject: ', projectId);
                console.log('GetTasksProject: ', this.GetTasksProject);
                if(this.GetTasksProject[0].id) return this.GetTasksProject
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async GetProjectById(projectId) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/projects/${projectId}`, {
                    method: "GET",
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                let GetPrject = await res.json()
                console.log('GetPrject: ', GetPrject);
                this.ProjectDate = GetPrject.dueDate
                if(GetPrject) return GetPrject.dueDate
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async createTask(name,description,startDate,endDate,projectId,userId,statusId) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/tasks`, {
                    method: "POST",
                    body: JSON.stringify({ name,description,startDate,endDate,projectId,userId,statusId }),
                    headers: {
                        Authorization:
                        `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                })
                let createTask = await res.json()
                console.log('createTask: ', createTask);
                if(createTask) return true
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async deleteTask(id) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/tasks/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization:
                        `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                        },
                })
                this.DeletePro = await res.json()
                console.log('DeletePro: ', this.DeletePro);
                if(this.DeletePro.id) return true
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async updateTask(id,name,description,startDate,endDate,userId,statusId) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/tasks/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ name,description,startDate,endDate,userId,statusId }),
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                        },
                })
                let UpdateTask = await res.json()
                console.log('UpdateTask: ', UpdateTask);
                return true
            } catch (error) {
                console.log(error)
            }
        },
        async SendInvitation(receiverEmail,projectId) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/invitations`, {
                    method: "POST",
                    body: JSON.stringify({ receiverEmail,projectId }),
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                        },
                })
                let sendInvitation = await res.json()
                console.log('sendInvitation: ', sendInvitation);
                if(sendInvitation.id) return sendInvitation
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async GetInvitations() {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/invitations`, {
                    method: "GET",
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                        },
                })
                this.getInvitations = await res.json()
                console.log('getInvitations: ', this.getInvitations);
                if(this.getInvitations.id) return true
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async AccesptInvitation(id) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/invitations/${id}/approve`, {
                    method: "PATCH",
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                        },
                })
                let accesptInvitation = await res.json()
                console.log('accesptInvitation: ', accesptInvitation);
                if(accesptInvitation.id) return true
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async RejectInvitation(id) {
            try {
                const res = await fetch(`https://project-management-barakah.vercel.app/invitations/${id}/reject`, {
                    method: "PATCH",
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                        },
                })
                let rejectInvitation = await res.json()
                console.log('rejectInvitation: ', rejectInvitation);
                if(rejectInvitation.id) return true
                else return false
            } catch (error) {
                console.log(error)
            }
        },
        async DashboardCharts() {
            try {
                const res = await fetch(`http://localhost:3000/api#/statistics/StatisticsController_getStatistics`, {
                    method: "PATCH",
                    headers: {
                        Authorization:
                            `Bearer ${this.token}`,
                            'Content-Type': 'application/json',
                        },
                })
                let Dashboard = await res.json()
                console.log('Dashboard: ', Dashboard);
                if(Dashboard.id) return true
                else return false
            } catch (error) {
                console.log(error)
            }
        },

    },
})
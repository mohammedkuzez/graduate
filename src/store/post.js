import { defineStore } from 'pinia'

export const useDataStore = defineStore('Data', {
    state() {
        return {
         users : [{
                id: 1,
                email: 'john.doe@gmail.com',
                name: 'John Doe',
                role: 'MEMBER'
            },
            {
                id: 2,
                email: 'moaz.k@gmail.com',
                name: 'moaz k',
                role: 'MEMBER'
            },
            {
                id: 3,
                email: 'Anas.k@gmail.com',
                name: 'Anas k',
                role: 'MEMBER'
            },
        ],
         ProjectManag : [  {
                id: 1,
                name: "Website Redesign",
                description: "Complete overhaul of the company website",
                dueDate: "2025-12-31",
                creatorId: 1,
                creator: {
                    id: 1,
                    name: "John Doe",
                    email: "john@gmail.com",
                },
                assignedUsers: [],
                createdAt: "2025-01-15T10:00:00Z",
                updatedAt: "2025-01-15T10:00:00Z",
            },
            {
                id: 2,
                name: "Moaz Kuzez",
                description: "Complete overhaul of the company website",
                dueDate: "2025-12-31",
                creatorId: 2,
                creator: {
                    id: 2,
                    name: "Moaz Kuzez",
                    email: "Moaz@gmail.com",
                },
                assignedUsers: [],
                createdAt: "2025-01-15T10:00:00Z",
                updatedAt: "2025-01-15T10:00:00Z",
            },
            {
                id: 3,
                name: "Anas Kuzez",
                description: "Complete overhaul of the company website",
                dueDate: "2025-12-31",
                creatorId: 3,
                creator: {
                    id: 3,
                    name: "Anas Kuzez",
                    email: "Anas@gmail.com",
                },
                assignedUsers: [],
                createdAt: "2025-01-15T10:00:00Z",
                updatedAt: "2025-01-15T10:00:00Z",
            },
        ],
        }
    },

  getters: {

  },

  actions: {

  }
})
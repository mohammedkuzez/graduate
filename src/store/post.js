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
                description: "Complete overhaul oaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaf the company website this is me so you can see",
                dueDate: "2025-12-31",
                creatorId: 1,
                creator: {
                    id: 1,
                    name: "John Doe",
                    email: "john@gmail.com",
                },
                assignedUsers: [
                    {
                    id: 6,
                    name: "Noor Kuzez",
                    email: "john@gmail.com",
                },
                {
                    id: 7,
                    name: "Suhayn Kuzez",
                    email: "john@gmail.com",
                },
                {
                    id: 8,
                    name: "Luay Kuzez",
                    email: "john@gmail.com",
                },
                ],
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
    deleteProjectByName(name) {
      this.ProjectManag = this.ProjectManag.filter(project => project.name !== name)
    },
        UpateProjectByName(oldName, newName, newDescription, newDate) {
      const index = this.ProjectManag.findIndex(
        project => project.name === oldName
      );
      if (index !== -1) {
        this.ProjectManag[index] = {
          ...this.ProjectManag[index],
          name: newName,
          description: newDescription,
          dueDate: newDate,
        };
  }
  console.log(this.ProjectManag);
  
}
}
})
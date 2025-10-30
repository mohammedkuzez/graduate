import SignUp from "@/components/SignUp.vue"
import { en } from "vuetify/locale"

export default {
    signUp: {
        fullName: 'Full Name',
        emailAddress: 'Email Adderss',
        password: 'Passowrd',
        confirmPassword: 'Confirm Password',
        account: 'Account',
        signUp: 'Sign Up',
        logIn: 'Log In',
        signUpNow: 'Sign up now',
        forgotPassword: 'Forgot password',
    },
    home: {
        mainTitle: 'MTR',
        projectManagement: 'Project Management',
        taskManagement: 'Task Management',
        taskStatusManagement: 'Task Status Management',
        dashboard: 'Dashboard',
        invitation: 'Invitation',
    },
    projectManagement: {
        yourProjects: 'Your Projects',
        addProject: '+ New Project',
        addingProject: 'Adding Project',
        projectName: 'Project Name',
        description: 'Description',
        date: 'Date',
        edit: 'Edit',
        delete: 'Delete',
        projectDescription: "Project Description",
    },
    AddAndUpateProject: {
        active: 'Active',
        inactive: 'Inative',
    },
    hint: {
        PlsEnterUName: 'Please Enter Your Name Like: Moaz kuzez',
        PlsEnterUEmail: 'Plase Enter Your Account Like: Moazkuzez5@gmail.com',
        PlsEnterUPassword: 'Please Enter Your Password',
        PlsEnterUConfrimPassword: 'Please Enter Confirm Password',
        PlsEnterProjectName: 'Please Enter Project Name',
        PlsEnterProjectdescription: 'Please Enter Project Decription',
        PlsEnterProjectdate: 'Please Enter Project Date',

    },
    
    title: 'Bloggy',
    subtitle: 'Most Valuable Articles',
    // articlesTitle: 'Articles',
    // articlesSubtitle: 'List of articles',
    id: 'ID',
    titleCol: 'Title',
    tagsCol: 'Tags',
    reactionsCol: 'Reactions',
    bodyCol: 'Content',


    articles: {
        title: 'Articles',
        subtitle: 'List of articles',
    },
    
    $vuetify: {
        ...en,
    }
}
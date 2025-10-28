import Login from '@/components/Login.vue'
import { email } from '@vee-validate/rules'
import { ar } from 'vuetify/locale'

export default {
    signUp: {
        fullName: 'الاسم الكامل',
        emailAddress: 'البريد الالكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تاكيد كلمة المرور',
        account: 'الحساب',
        signUp: 'إنشاء حساب جديد',
        logIn: 'تسجيل الدخول',
        signUpNow: 'إنشاء حساب جديد الآن',
        forgotPassword: 'هل نسيت كبمة المرور'
    },
    home: {
        mainTitle: 'لتصح',
        projectManagement: 'إدارة المشاريع',
        taskManagement: 'إدارة المهام',
        taskStatusManagement: 'إدارة حالة المهام',
        dashboard: 'لوحة التحكم',
        invitation: 'دعوة', 
    },
    projectManagement: {
        yourProjects: 'مشروعاتك',
        addProject: 'إضافة مشروع +',
        addingProject: 'تضيف مشروع',
        projectName: 'اسم المشروع',
        description: 'الوصف',
        date: 'التاريخ'
    },
    title: 'بلوغي',
    subtitle: 'أكثر المقالات قيمة',
    articlesTitle: 'المقالات 2',
    articlesSubtitle: 'قائمة المقالات',
    id: 'المعرف',
    titleCol: 'العنوان',
    tagsCol: 'العلامات',
    reactionsCol: 'التفاعلات',
    bodyCol: 'المحتوى',
    articles: {
        title: 'المقالات',
        subtitle: 'قائمة المقالات',
    },
    
    $vuetify: {
        ...ar,
    }
}
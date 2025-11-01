import Login from '@/components/Login.vue'
import { email } from '@vee-validate/rules'
import { ar } from 'vuetify/locale'

export default {
    signUp: {
        fullName: 'الاسم الكامل',
        FirstName: 'الاسم الأول',
        LastName: 'الاسم الأخير',
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
        addProject: 'مشروع جديد +',
        addingProject: 'تضيف مشروع',
        projectName: 'اسم المشروع',
        description: 'الوصف',
        date: 'التاريخ',
        projectName: ':اسم المشروع',
        edit: 'تعديل',
        delete: 'حذف',
        projectDescription: 'وصف المشروع',
    },
    AddAndUpateProject: {
        active: 'تفعيل',
        inactive: 'إلغاء التفعيل',
    },
    hints: {
        PlsEnterUFirstName: 'ادخل اسمك من فضلك مثل: محمد معاذ',
        PlsEnterULastName: 'ادخل اسمك من فضلك مثل: قزيز',
        PlsEnterUEmail: 'ادخل حسابك الالكتروني من فضلك',
        PlsEnterUPassword: 'ادخل كلمة السر من فضلك',
        PlsEnterUConfrimPassword: 'ادخل تأكيد كلمة المرور',
        PlsEnterProjectName: 'ادخل اسم المشروع من فضلك',
        PlsEnterProjectdescription: 'ادخل وصف المشروع من فضلك',
        PlsEnterProjectdate: 'ادخل تاريخ المشروع من فضلك',
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
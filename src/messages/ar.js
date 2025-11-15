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
        logInNow: 'تسجيل الدخول الآن',
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
        addingProject: 'إضافة مشروع',
        projectName: 'اسم المشروع',
        description: 'الوصف',
        projectName: ':اسم المشروع',
        date: 'التاريخ',
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
        PlsEnterTaskName: 'ادخل اسم المهمة من فضلك',
        PlsEnterTaskdescription: 'ادخل وصف المهمة من فضلك',
        PlsEnterTaskStartDate: 'ادخل التاريخ الذي ستبدأ بإنجاز بهذه المهمة',
        PlsEnterTaskDueDate: 'ادخل التاريخ المتوقع لانتهاء المهمة',
    },
    ProjectTasks: {
        Project: 'مشروع',
        TaskName: 'اسم المهمة',
        description: 'الوصف',
        NewTask: 'إضافة مهمة',
        addingTask: 'تضيف مهمة',
        TaskState: "حالة المهمة",
        TaskStartDate: 'تاريخ البداية',
        TaskDueDate: 'تاريخ النهاية',
        edit: 'تعديل',
        delete: 'حذف',
    },
    Invitation: {
        Invitation: "الدعوات",
        NewInvitation: 'إضافة دعوة',
        addingInvitation: 'تضيف دعوة',
        senderName: 'أسم المرسل',
        senderEmail: 'عنوان البريد الالكتروني للمرسل',
        createDate: "تاريخ الإنشاء",

    },
    Dashboard: {
        totalProjects: "عدد المشاريع الكلي",
        totalTasks: "عدد المهام الكلي",
        YourStatus: "إحصائياتك",
    },
    save: 'حفظ',
    cancel: 'إلغاء',
    send: 'إرسال',
    accept: 'قبول',
    reject: 'رفض',
    close: 'إغلاق',
    ReadMore: 'إقراء المزيد',
    $vuetify: {
        ...ar,
    }
}
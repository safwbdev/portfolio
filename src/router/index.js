import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import NewSkill from '@/components/skills/NewSkill'
import ViewSkill from '@/components/skills/ViewSkill'
import EditSkill from '@/components/skills/EditSkill'
import ViewExperience from '@/components/experience/ViewExperience'
import NewExperience from '@/components/experience/NewExperience'
import EditExperience from '@/components/experience/EditExperience'
import NewEducation from '@/components/education/NewEducation'
import ViewEducation from '@/components/education/ViewEducation'
import EditEducation from '@/components/education/EditEducation'
import ViewProject from '@/components/projects/ViewProject'
import NewProject from '@/components/projects/NewProject'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new-education',
      name: 'new-education',
      component: NewEducation
    },
    {
      path: '/new-skill',
      name: 'new-skill',
      component: NewSkill
    },
    {
      path: '/new-experience',
      name: 'new-experience',
      component: NewExperience
    },
    {
      path: '/new-project',
      name: 'new-project',
      component: NewProject
    },
    {
      path: '/edit/:skill_id',
      name: 'edit-skill',
      component: EditSkill
    },
    {
      path: '/edit/:edu_id',
      name: 'edit-education',
      component: EditEducation
    },
    {
      path: '/edit/:work_id',
      name: 'edit-experience',
      component: EditExperience
    },
    {
      path: '/view-skill/:skill_id',
      name: 'view-skill',
      component: ViewSkill
    },
    {
      path: '/view-experience/:work_id',
      name: 'view-experience',
      component: ViewExperience
    },
    {
      path: '/view-education/:edu_id',
      name: 'view-education',
      component: ViewEducation
    },
    {
      path: '/view-project/:project_id',
      name: 'view-project',
      component: ViewProject
    }
  ]
})

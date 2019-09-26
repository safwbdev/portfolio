<template>
    <div id="dasboard">
        
        <Personal />
        <SkillsBox title="Skills" />
        <EducationBox title="Education" />
        <ExperienceBox title="Working Experience" />
        <ProjectBox title="Projects" />
    </div>
</template>

<script>
    import Personal from './Personal'
    import SkillsBox from './skills/SkillsBox'
    import EducationBox from './education/EducationBox'
    import ExperienceBox from './experience/ExperienceBox'
    import ProjectBox from './projects/ProjectBox'
    export default {
        name: 'dashboard',
        components: {
            Personal,
            SkillsBox, 
            EducationBox, 
            ExperienceBox,
            ProjectBox,
        },
        data() {
            return {}
        },
        created () {}
    }
</script>

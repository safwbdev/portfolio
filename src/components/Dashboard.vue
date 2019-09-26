<template>
    <div id="dasboard">
        <Personal />
        <SkillsBox title="Skills" />
        <EducationBox title="Education" />
        <ExperienceBox title="Working Experience" />
    </div>
</template>

<script>
    import Personal from './Personal'
    import SkillsBox from './skills/SkillsBox'
    import EducationBox from './education/EducationBox'
    import ExperienceBox from './experience/ExperienceBox'
    export default {
        name: 'dashboard',
        components: {
            Personal,
            SkillsBox, 
            EducationBox, 
            ExperienceBox,
        },
        data() {
            return {}
        },
        created () {}
    }
</script>

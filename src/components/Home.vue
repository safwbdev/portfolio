<template>
    <div id="dasboard">
        <Personal />
        <div class="divider"></div>
        <SkillsSection />
        <div class="divider"></div>
        <div class="row">
            <div class="row col xl6 l6 m12 s12">
                <ExperienceSection />
            </div>
            <div class="row col xl6 l6 m12 s12">
                <EducationSection />
            </div>
        </div>
        <div class="divider"></div>
    </div>
</template>

<script>
    import Personal from './Personal'
    import SkillsSection from './skills/SkillsSection'
    import EducationSection from './education/EducationSection'
    import ExperienceSection from './experience/ExperienceSection'
    export default {
        name: 'dashboard',
        components: {
            Personal,
            SkillsSection, 
            EducationSection, 
            ExperienceSection,
        },
        data() {
            return {}
        },
        created () {}
    }
</script>

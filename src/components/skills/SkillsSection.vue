<template>
    <div class="section">
        <div class="row">
            <h4>Skills</h4>
            <div class="col s12">
                <h6>Areas of Expertise</h6>
                <span v-for="skill in essentail" v-bind:key="skill.id" class=" blue lighten-3 chip">
                    <fa-icon :icon="[skill.skill_icon[0], skill.skill_icon[1]]" /> | 
                    {{skill.skill_name}}
                </span>
                <h6>Technical</h6>
                <span v-for="skill in technical" v-bind:key="skill.id" class="lime chip">
                    <fa-icon :icon="[skill.skill_icon[0], skill.skill_icon[1]]" /> | 
                    {{skill.skill_name}}
                </span>
                <h6>Frameworks & Libraries</h6>
                <span v-for="skill in frameworks" v-bind:key="skill.id" class="yellow chip">
                    <fa-icon :icon="[skill.skill_icon[0], skill.skill_icon[1]]" /> | 
                    {{skill.skill_name}}
                </span>
                <h6>Database</h6>
                <span v-for="skill in database" v-bind:key="skill.id" class="orange lighten-2 chip">
                    <fa-icon :icon="[skill.skill_icon[0], skill.skill_icon[1]]" /> | 
                    {{skill.skill_name}}
                </span>
                <h6>Content Mangement Systems</h6>
                <span v-for="skill in cms" v-bind:key="skill.id" class="red lighten-2 chip">
                    <fa-icon :icon="[skill.skill_icon[0], skill.skill_icon[1]]" /> | 
                    {{skill.skill_name}}
                </span>
                <h6>Tools</h6>
                <span v-for="skill in tools" v-bind:key="skill.id" class=" purple lighten-4 chip">
                    <fa-icon :icon="[skill.skill_icon[0], skill.skill_icon[1]]" /> | 
                    {{skill.skill_name}}
                </span>
                <h6>Operating Systems</h6>
                <span v-for="skill in os" v-bind:key="skill.id" class=" purple lighten-4 chip">
                    <fa-icon :icon="[skill.skill_icon[0], skill.skill_icon[1]]" /> | 
                    {{skill.skill_name}}
                </span>
                <h6>Design</h6>
                <span v-for="skill in design" v-bind:key="skill.id" class=" purple lighten-4 chip">
                    <fa-icon :icon="[skill.skill_icon[0], skill.skill_icon[1]]" /> | 
                    {{skill.skill_name}}
                </span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.section{
    padding: 0;
    /* border:1px solid red; */
    text-align: center;
}
.section h4{
    padding: 0;
}
.section h6{
    padding: 20px 0 10px 0;
}
.chip svg{
font-size: 1.2em;
}
</style>

<script>
    import db from './../firebase/firebaseInit'
    export default {
        props:{
            title: String
        },
        data() {
            return {
                technical: [],
                essentail: [],
                frameworks: [],
                database: [],
                cms: [],
                tools: [],
                design: [],
                os: [],
                
            }
        },
        created () {
            db.collection('skills').orderBy('skill_name', 'asc').get().then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    // console.log(doc.id);
                    const data = {
                        'id': doc.id,
                        'skill_id' : doc.data().skill_id,
                        'skill_name' : doc.data().skill_name,
                        'skill_type' : doc.data().skill_type,
                        'skill_icon' : doc.data().skill_icon.split("::"),
                    }
                    switch(doc.data().skill_type) {
                        case "Essentials":
                            this.essentail.push(data);
                            break;
                        case "Technical":
                            this.technical.push(data);
                            break;
                        case "Framework":
                            this.frameworks.push(data);
                            break;
                        case "Database":
                            this.database.push(data);
                            break;
                        case "CMS":
                            this.cms.push(data);
                            break;
                        case "Tools":
                            this.tools.push(data);
                            break;
                        case "OS":
                            this.os.push(data);
                            break;
                        case "Design":
                            this.design.push(data);
                            break;
                        }
                        
                })
            })
        }
    }
</script>

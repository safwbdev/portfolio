<template>
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>{{title}}</h4>
        </li>
        <li v-for="skill in skills" v-bind:key="skill.id" class="collection-item">
            {{skill.skill_name}} | <div class="chip">{{skill.skill_type}}</div>
            <router-link class="secondary-content" v-bind:to="{name: 'view-skill',params: {skill_id: skill.skill_id}}">
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
        <li class="collection-item center">
            <router-link to="/new-skill" class="btn-floating btn-small red">
                <i class="fa fa-plus"></i>
            </router-link>
        </li>
    </ul>
</template>


<script>
    import db from './../firebase/firebaseInit'
    export default {
        props:{
            title: String
        },
        data() {
            return {
                skills: [],
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
                    }
                    this.skills.push(data)
                })
            }) 
        }
    }
</script>
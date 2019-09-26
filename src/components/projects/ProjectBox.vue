<template>
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>{{title}}</h4>
        </li>
        <li v-for="edu in education" v-bind:key="edu.id" class="collection-item">
            <div class="chip">{{edu.project_name}}</div>
            {{edu.project_id}} : {{edu.project_desc}} : {{edu.project_tools}} - {{edu.edu_end}} | {{edu.edu_desc}}
            <router-link class="secondary-content" v-bind:to="{name: 'view-project',params: {project_id: edu.project_id}}">
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
        <li class="collection-item center">
            <router-link to="/new-project" class="btn-floating btn-small red">
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
                education: [],
            }
        },
        created () {
            db.collection('projects').orderBy('project_id').get().then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    // console.log(doc.id);
                    const data = {
                        'id': doc.id,
                        'project_id' : doc.data().project_id,
                        'project_name' : doc.data().project_name,
                        'project_desc' : doc.data().project_desc,
                        'project_field' : doc.data().project_field,
                        'githubUrl' : doc.data().githubUrl,
                        'demoUrl' : doc.data().demoUrl,
                        'project_tools' : doc.data().project_tools,
                    }
                    this.education.push(data)
                })
            })
        }
    }
</script>
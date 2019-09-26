<template>
    <div class="section">
        <h5>Portfolio</h5>
        <div class="row">
            <div 
                v-for="edu in education" 
                v-bind:key="edu.id" 
                class="row col xl6 l6 m12 s12">
                <div>{{edu.project_name}}</div>
                <div>{{edu.project_desc}}</div>
                <div>{{edu.project_tools}}</div>
                <div>{{edu.githubUrl}}</div>
                <div>{{edu.demoUrl}}</div>
            </div>
        </div>
    </div>
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
            db.collection('projects').orderBy('project_id', 'asc').get().then(querysnapshot => {
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
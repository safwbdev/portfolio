<template>
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>{{title}}</h4>
        </li>
        <li v-for="edu in education" v-bind:key="edu.id" class="collection-item">
            <div class="chip">{{edu.edu_name}}</div>
            {{edu.edu_id}} : {{edu.edu_field}} : {{edu.edu_start}} - {{edu.edu_end}} | {{edu.edu_location}}
            <router-link class="secondary-content" v-bind:to="{name: 'view-education',params: {edu_id: edu.edu_id}}">
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
        <li class="collection-item center">
            <router-link to="/new-education" class="btn-floating btn-small red">
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
            db.collection('education').orderBy('edu_id').get().then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    // console.log(doc.id);
                    const data = {
                        'id': doc.id,
                        'edu_id' : doc.data().edu_id,
                        'edu_name' : doc.data().edu_name,
                        'edu_field' : doc.data().edu_field,
                        'edu_start' : doc.data().edu_start,
                        'edu_end' : doc.data().edu_end,
                        'edu_location' : doc.data().edu_location,
                    }
                    this.education.push(data)
                })
            })
        }
    }
</script>
<template>
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>{{title}}</h4>
        </li>
        <li v-for="work in experience" v-bind:key="work.id" class="collection-item">
            <div class="chip">{{work.work_name}}</div>
            {{work.work_id}} : {{work.work_position}} : {{work.work_start}} - {{work.work_end}} | {{work.work_location}}
            <router-link class="secondary-content" v-bind:to="{name: 'view-experience',params: {work_id: work.work_id}}">
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
        <li class="collection-item center">
            <router-link to="/new-experience" class="btn-floating btn-small red">
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
                experience: [],
            }
        },
        created () {
            db.collection('experience').orderBy('work_id').get().then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    // console.log(doc.id);
                    const data = {
                        'id': doc.id,
                        'work_id' : doc.data().work_id,
                        'work_name' : doc.data().work_name,
                        'work_position' : doc.data().work_position,
                        'work_start' : doc.data().work_start,
                        'work_end' : doc.data().work_end,
                        'work_desc' : doc.data().work_desc,
                        'work_location' : doc.data().work_location,
                    }
                    this.experience.push(data)
                })
            })
        }
    }
</script>
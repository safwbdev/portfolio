<template>
    <div class="section">
        <h5>Work Experience</h5>
        <div class="row">
            <div v-for="work in experience" v-bind:key="work.id" class="row col xl12 l12 m12 s12">
                <div>{{work.work_position}} | {{work.work_start}} - {{work.work_end}}</div>
                <div>{{work.work_name}} | {{work.work_location}}</div>
                <div>{{work.work_desc}}</div> 
            </div>
        </div>
    </div>
</template>


<script>
    import db from './../firebase/firebaseInit';
    import moment from 'moment';
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
            db.collection('experience').orderBy('work_end', 'desc').get().then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    // console.log(doc.id);
                    const data = {
                        'id': doc.id,
                        'work_id' : doc.data().work_id,
                        'work_name' : doc.data().work_name,
                        'work_position' : doc.data().work_position,
                        'work_start' : moment(doc.data().work_start).format('MMMM YYYY'),
                        'work_end' : moment(doc.data().work_end).format('MMMM YYYY'),
                        'work_desc' : doc.data().work_desc,
                        'work_location' : doc.data().work_location,
                    }
                    this.experience.push(data)
                })
            })
        }
    }
</script>
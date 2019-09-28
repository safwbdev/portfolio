<template>
    <div class="section">
        <h4>Work Experience</h4>
        <div class="row">
            <div v-for="work in experience" v-bind:key="work.id" class="work row col xl12 l12 m12 s12">
                <div><span class="position">{{work.work_position}}</span> | <span class="duration">{{work.work_start}} - {{work.work_end}}</span></div>
                <div><span class="company">{{work.work_name}}</span> | <span class="">{{work.work_location}}</span></div>
                <div class="desc">{{work.work_desc}}</div> 
            </div>
        </div>
    </div>
</template>

<style scoped>
.work{
    /* border:1px solid red; */
    line-height: 1.8em;
}
.work .position{
    font-weight: bold;
    font-size: 18px;
}
.work .company{
    font-weight: bold;

}
</style>
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
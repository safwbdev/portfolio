<template>
    <div id="edit-experience">
        <h3>Edit Work Experience</h3>
        <div class="row">
            <form @submit.prevent="updateSkill" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="work_id" required hidden>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="work_name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="work_position" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <datepicker placeholder="Start Date" type="text" v-model="work_start" required />
                    </div>
                    <div class="input-field col s6">
                        <datepicker placeholder="End Date" v-model="work_end" type="text" required />
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea v-model="work_desc" required></textarea>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link v-bind:to="{name: 'view-experience'}" class="btn">
                    Cancel
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import db from './../firebase/firebaseInit';
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    export default {
        name: 'edit-experience',
        data() {
            return {
                work_id: null,
                work_name: null,
                work_position: null,
                work_start: null,
                work_end: null,
                work_desc: null,
            }
        },
        beforeRouteEnter (to,from,next) {
            db.collection('experience').where('work_id',
            '==', to.params.work_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.work_id = doc.data().work_id
                        vm.work_name = doc.data().work_name
                        vm.work_position = doc.data().work_position
                        vm.work_start = doc.data().work_start
                        vm.work_end = doc.data().work_end
                        vm.work_desc = doc.data().work_desc
                    })
                })
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                db.collection('experience').where
                ('work_id', '==', this.$route.params.work_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.work_id = doc.data().work_id
                        this.work_name = doc.data().work_name
                        this.work_position = doc.data().work_position
                        this.work_start = doc.data().work_start
                        this.work_end = doc.data().work_end
                        this.work_desc = doc.data().work_desc
                    })
                })
            },
            updateSkill () {
                db.collection('experience').where
                ('work_id', '==', this.$route.params.work_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            work_id: this.work_id,
                            work_name: this.work_name,
                            work_position: this.work_position,
                            work_start: moment(this.work_start).format('YYYY-MM-DD'),
                            work_end: moment(this.work_end).format('YYYY-MM-DD'),
                            work_desc: this.work_desc,
                        })
                        .then(() => {
                            this.$router.push({
                                name: 'view-experience', 
                                params: {work_id: this.work_id}})
                        })
                    })
                })
            }
        },
        components: {
            Datepicker
        }
    }
</script>

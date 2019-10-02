<template>
    <div id="new-skill">
        <div class="container">
            <h3>New Skill</h3>
            <div class="row">
                <form @submit.prevent="saveEmployee" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input disabled type="text" v-model="skill_id" required hidden>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="text" v-model="skill_name" required>
                            <label>Skill Name</label>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="input-field col s12">
                            <input type="text" v-model="skill_type" required>
                            <label>Skill Type</label>
                        </div>
                    </div> -->
                    <div class="row">
                        <label>Skill Type</label>
                        <div class="input-field col s12">
                            <select v-model="skill_type">
                                <option selected="selected" disabled>== Select Skill Type ==</option>
                                <option v-for="option in options" 
                                v-bind:value="option.value" 
                                v-bind:key="option.key">
                                    {{ option.text }}
                                </option>
                            </select>
                            <!-- <span>Selected: {{ selected }}</span> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                    <button type="submit" class="btn">Submit</button>
                    <router-link to="/dashboard" class="btn">Cancel</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import db from './../firebase/firebaseInit'
    export default {
        name: 'new-employee',
        data() {
            return {
                // colectionID: [],

                selected: 'A',
                options: [
                    { text: 'Essentials', value: 'Essentials' },
                    { text: 'Technical', value: 'Technical' },
                    { text: 'Framework', value: 'Framework' },
                    { text: 'CMS', value: 'CMS' },
                    { text: 'Database', value: 'Database' },
                    { text: 'Tools', value: 'Tools' },
                    { text: 'OS', value: 'OS' },
                    { text: 'Design', value: 'Design' },
                ],

                skill_id: null,
                skill_name: null,
                skill_type: null,
                skill_icon: 'fas::code',
            }
        },
        beforeRouteEnter (to,from,next) {
            db.collection('skills').orderBy('skill_id', 'desc').limit(1).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.skill_id = (parseInt(doc.data().skill_id) + 1)
                    })
                })
            })
        },
        
        methods: {
            saveEmployee() {
                db.collection('skills').add({
                    skill_id: this.skill_id,
                    skill_icon: this.skill_icon,
                    skill_name: this.skill_name,
                    skill_type: this.skill_type,
                })
                .then(docRef => this.$router.push('/dashboard'))
                .catch(error => console.log(err))
            }
        }
    }
</script>
<style scoped>
select{
    display: block;
}
</style>